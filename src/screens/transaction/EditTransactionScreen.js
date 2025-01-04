import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTransaction } from "../../context/TransactionContext";
import { useBudget } from "../../context/BudgetContext";

// Danh sách nhóm chi tiêu
const CATEGORIES = [
  { id: "1", name: "Ăn uống", icon: "restaurant" },
  { id: "2", name: "Di chuyển", icon: "car" },
  { id: "3", name: "Mua sắm", icon: "cart" },
  { id: "4", name: "Giải trí", icon: "game-controller" },
  { id: "5", name: "Hóa đơn", icon: "receipt" },
];

export default function EditTransactionScreen({ route, navigation }) {
  const { transaction } = route.params;
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [note, setNote] = useState(transaction.note);
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES.find((cat) => cat.name === transaction.category) || CATEGORIES[0]
  );
  const [showCategories, setShowCategories] = useState(false);

  const { updateTransaction } = useTransaction();
  const { updateBalance } = useBudget();

  const handleAmountChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  const handleUpdate = async () => {
    if (!amount || parseInt(amount) === 0) {
      Alert.alert("Lỗi", "Vui lòng nhập số tiền hợp lệ");
      return;
    }

    try {
      const numericAmount = parseInt(amount, 10);
      const amountDiff = numericAmount - transaction.amount;

      await updateTransaction(transaction.id, {
        amount: numericAmount,
        note,
        category: selectedCategory.name,
        categoryIcon: selectedCategory.icon,
      });

      // Cập nhật số dư tổng
      if (transaction.type === "expense") {
        await updateBalance(-amountDiff);
      } else {
        await updateBalance(amountDiff);
      }

      Alert.alert("Thành công", "Đã cập nhật giao dịch", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật giao dịch");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Số tiền */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Số tiền</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencyText}>VND</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
            placeholder="0"
          />
        </View>
      </View>

      {/* Chọn nhóm */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setShowCategories(!showCategories)}>
          <View style={styles.menuLeft}>
            <View style={styles.iconPlaceholder}>
              <Ionicons
                name={selectedCategory.icon}
                size={24}
                color="#4CAF50"
              />
            </View>
            <Text style={styles.menuText}>{selectedCategory.name}</Text>
          </View>
          <Ionicons
            name={showCategories ? "chevron-up" : "chevron-down"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>

        {showCategories && (
          <View style={styles.categoriesList}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory.id === category.id &&
                    styles.selectedCategory,
                ]}
                onPress={() => handleCategorySelect(category)}>
                <Ionicons
                  name={category.icon}
                  size={24}
                  color={
                    selectedCategory.id === category.id ? "#4CAF50" : "#666"
                  }
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory.id === category.id &&
                      styles.selectedCategoryText,
                  ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Ghi chú */}
      <View style={styles.menuSection}>
        <View style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <View style={styles.iconPlaceholder}>
              <Ionicons name="create-outline" size={24} color="#4CAF50" />
            </View>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="Thêm ghi chú"
              placeholderTextColor="#666"
            />
          </View>
        </View>
      </View>

      {/* Nút cập nhật */}
      <TouchableOpacity
        style={[
          styles.updateButton,
          amount && parseInt(amount) > 0 ? styles.updateButtonActive : {},
        ]}
        onPress={handleUpdate}
        disabled={!amount || parseInt(amount) === 0}>
        <Text
          style={[
            styles.updateButtonText,
            amount && parseInt(amount) > 0 ? styles.updateButtonTextActive : {},
          ]}>
          Cập nhật
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  amountContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  amountLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyText: {
    fontSize: 24,
    color: "#666",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    color: "#000",
  },
  menuSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: "#000",
  },
  categoriesList: {
    backgroundColor: "#f5f5f5",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedCategory: {
    backgroundColor: "#E8F5E9",
  },
  categoryText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 12,
  },
  selectedCategoryText: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  noteInput: {
    flex: 1,
    fontSize: 16,
    color: "#666",
  },
  updateButton: {
    margin: 16,
    padding: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
  },
  updateButtonActive: {
    backgroundColor: "#4CAF50",
  },
  updateButtonText: {
    fontSize: 16,
    color: "#666",
  },
  updateButtonTextActive: {
    color: "white",
  },
});
