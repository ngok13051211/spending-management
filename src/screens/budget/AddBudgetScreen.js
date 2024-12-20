import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBudget } from "../../context/BudgetContext";

export default function AddBudgetScreen({ navigation }) {
  const [amount, setAmount] = useState("0");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateBalance } = useBudget();

  const handleAmountChange = (value) => {
    // Loại bỏ các ký tự không phải số
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };

  const handleSave = async () => {
    if (!amount || amount === "0") {
      Alert.alert("Lỗi", "Vui lòng nhập số tiền");
      return;
    }

    try {
      setIsLoading(true);
      const numericAmount = parseInt(amount, 10);
      await updateBalance(numericAmount);

      Alert.alert("Thành công", "Đã thêm ngân sách thành công", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Main", {
              screen: "Overview",
            });
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu ngân sách. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
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
        <Text style={styles.headerTitle}>Thêm ngân sách</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Category Selection */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="help" size={24} color="#666" />
            </View>
            <Text style={styles.menuText}>CHỌN NHÓM</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

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
              editable={!isLoading}
            />
          </View>
        </View>

        {/* Date Selection */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="calendar-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Tháng này (01/12 - 31/12)</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        {/* Total */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="book-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Tổng cộng</Text>
          </View>
        </TouchableOpacity>

        {/* Recurring Budget Option */}
        <View style={styles.recurringSection}>
          <Text style={styles.recurringTitle}>Lập lại ngân sách này</Text>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIsRecurring(!isRecurring)}>
            <View
              style={[
                styles.checkboxInner,
                isRecurring && styles.checkboxChecked,
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.recurringDescription}>
            Ngân sách được tự động lập lại ở kỳ hạn tiếp theo.
          </Text>
        </View>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          amount && amount !== "0" ? styles.saveButtonActive : {},
          isLoading && styles.saveButtonDisabled,
        ]}
        onPress={handleSave}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator
            color={amount && amount !== "0" ? "white" : "#666"}
          />
        ) : (
          <Text
            style={[
              styles.saveButtonText,
              amount && amount !== "0" ? styles.saveButtonTextActive : {},
            ]}>
            LƯU
          </Text>
        )}
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
  },
  iconContainer: {
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
    marginLeft: 12,
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
    textAlign: "right",
  },
  recurringSection: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginTop: 16,
  },
  recurringTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#666",
    borderRadius: 4,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 2,
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
  },
  recurringDescription: {
    fontSize: 14,
    color: "#666",
  },
  saveButton: {
    margin: 16,
    padding: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#666",
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  saveButtonActive: {
    backgroundColor: "#4CAF50",
  },
  saveButtonTextActive: {
    color: "white",
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
});
