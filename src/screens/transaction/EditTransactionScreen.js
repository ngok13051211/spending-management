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

export default function EditTransactionScreen({ route, navigation }) {
  const { transaction } = route.params;
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [note, setNote] = useState(transaction.note);
  const [category, setCategory] = useState(transaction.category);

  const { updateTransaction } = useTransaction();
  const { updateBalance } = useBudget();

  const handleAmountChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };

  const handleUpdate = async () => {
    if (!amount || amount === "0") {
      Alert.alert("Lỗi", "Vui lòng nhập số tiền");
      return;
    }

    try {
      const numericAmount = parseInt(amount, 10);
      const amountDiff = numericAmount - transaction.amount;

      await updateTransaction(transaction.id, {
        amount: numericAmount,
        note,
        category,
      });

      // Cập nhật số dư tổng
      if (transaction.type === "expense") {
        await updateBalance(amountDiff);
      } else {
        await updateBalance(-amountDiff);
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sửa giao dịch</Text>
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
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <View style={styles.iconPlaceholder}>
              <Ionicons name="help" size={24} color="#666" />
            </View>
            <Text style={styles.menuText}>{category || "Chọn nhóm"}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

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

      {/* Update Button */}
      <TouchableOpacity
        style={[
          styles.updateButton,
          amount && amount !== "0" ? styles.updateButtonActive : {},
        ]}
        onPress={handleUpdate}>
        <Text
          style={[
            styles.updateButtonText,
            amount && amount !== "0" ? styles.updateButtonTextActive : {},
          ]}>
          CẬP NHẬT
        </Text>
      </TouchableOpacity>
    </View>
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
  noteInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
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
