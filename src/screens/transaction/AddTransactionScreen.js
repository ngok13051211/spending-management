import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTransaction } from "../../context/TransactionContext";
import { useBudget } from "../../context/BudgetContext";

// Danh sách nhóm chi tiêu mẫu
const CATEGORIES = [
  { id: "1", name: "Ăn uống", icon: "restaurant" },
  { id: "2", name: "Di chuyển", icon: "car" },
  { id: "3", name: "Mua sắm", icon: "cart" },
  { id: "4", name: "Giải trí", icon: "game-controller" },
  { id: "5", name: "Hóa đơn", icon: "receipt" },
];

export default function AddTransactionScreen({ navigation }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const { addTransaction } = useTransaction();
  const { updateBalance } = useBudget();

  const handleAmountChange = (value) => {
    // Chỉ cho phép nhập số
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  const handleSave = async () => {
    if (!amount || !selectedCategory) {
      Alert.alert("Lỗi", "Vui lòng nhập số tiền và chọn nhóm");
      return;
    }

    try {
      const numericAmount = parseInt(amount, 10);

      await addTransaction({
        amount: numericAmount,
        note,
        category: selectedCategory.name,
        categoryIcon: selectedCategory.icon,
        type: "expense",
      });

      // Trừ số tiền khỏi tổng số dư
      await updateBalance(-numericAmount);

      Alert.alert("Thành công", "Đã thêm chi tiêu", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("Main", { screen: "Transactions" }),
        },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu chi tiêu");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm chi tiêu</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Amount Input */}
        <View style={styles.amountSection}>
          <Text style={styles.label}>Số tiền</Text>
          <View style={styles.amountRow}>
            <Text style={styles.currency}>VND</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Category Selection */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setShowCategories(!showCategories)}>
          <View style={styles.menuLeft}>
            <View style={styles.iconPlaceholder}>
              {selectedCategory ? (
                <Ionicons name={selectedCategory.icon} size={24} color="#666" />
              ) : (
                <Ionicons name="help" size={24} color="#666" />
              )}
            </View>
            <Text style={styles.menuText}>
              {selectedCategory ? selectedCategory.name : "Chọn nhóm"}
            </Text>
          </View>
          <Ionicons
            name={showCategories ? "chevron-up" : "chevron-down"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>

        {/* Categories List */}
        {showCategories && (
          <View style={styles.categoriesList}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => handleCategorySelect(category)}>
                <Ionicons name={category.icon} size={24} color="#666" />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Note Input */}
        <View style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="list" size={24} color="#666" />
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="Thêm ghi chú"
              placeholderTextColor="#666"
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          amount && selectedCategory ? styles.saveButtonActive : {},
        ]}
        onPress={handleSave}>
        <Text
          style={[
            styles.saveButtonText,
            amount && selectedCategory ? styles.saveButtonTextActive : {},
          ]}>
          LƯU
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 40,
  },
  content: {
    flex: 1,
  },
  amountSection: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginBottom: 1,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    fontSize: 16,
    color: "#666",
    marginRight: 8,
  },
  amountInput: {
    fontSize: 24,
    color: "#4CAF50",
    minWidth: 100,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginBottom: 1,
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
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: "#666",
  },
  categoriesList: {
    backgroundColor: "#f5f5f5",
    marginBottom: 1,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  categoryText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 12,
  },
  noteInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: "#666",
  },
  saveButton: {
    margin: 16,
    padding: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonActive: {
    backgroundColor: "#4CAF50",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#666",
  },
  saveButtonTextActive: {
    color: "white",
  },
});
