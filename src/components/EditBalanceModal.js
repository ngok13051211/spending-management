import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBudget } from "../context/BudgetContext";

export default function EditBalanceModal({ visible, onClose, currentBalance }) {
  const [newBalance, setNewBalance] = useState(currentBalance.toString());
  const { updateBalance } = useBudget();

  const handleAmountChange = (value) => {
    // Chỉ cho phép nhập số
    const numericValue = value.replace(/[^0-9]/g, "");
    setNewBalance(numericValue);
  };

  const handleUpdateBalance = async () => {
    try {
      const difference = parseInt(newBalance) - currentBalance;
      await updateBalance(difference);
      onClose();
      Alert.alert("Thành công", "Đã cập nhật số dư");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật số dư");
    }
  };

  const handleResetBalance = () => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc muốn xóa số dư hiện tại?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await updateBalance(-currentBalance); // Đặt về 0
            onClose();
            Alert.alert("Thành công", "Đã xóa số dư");
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa số dư");
          }
        },
      },
    ]);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Chỉnh sửa số dư</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Số dư mới</Text>
            <View style={styles.amountRow}>
              <Text style={styles.currency}>VND</Text>
              <TextInput
                style={styles.input}
                value={newBalance}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={handleResetBalance}>
              <Text style={styles.resetButtonText}>Xóa số dư</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.updateButton]}
              onPress={handleUpdateBalance}>
              <Text style={styles.updateButtonText}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },
  currency: {
    fontSize: 16,
    color: "#666",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#FF3B30",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
