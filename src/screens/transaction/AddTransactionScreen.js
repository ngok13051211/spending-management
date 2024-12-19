import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddTransactionScreen({ navigation }) {
  const [amount, setAmount] = useState("0");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thêm giao dịch</Text>
        </View>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <View style={styles.currencyContainer}>
            <Text style={styles.currencyText}>VND</Text>
          </View>
          <Text style={styles.amount}>{amount}</Text>
        </View>

        {/* Category Selection */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <View style={styles.iconPlaceholder}>
              <Ionicons name="help" size={24} color="#666" />
            </View>
            <Text style={styles.menuText}>Chọn nhóm</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        {/* Note Input */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="list" size={24} color="#666" />
            <Text style={styles.menuText}>Thêm ghi chú</Text>
          </View>
        </TouchableOpacity>

        {/* Date Selection */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="calendar" size={24} color="#666" />
            <Text style={styles.menuText}>Hôm nay</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        {/* Payment Method */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="wallet" size={24} color="#666" />
            <Text style={styles.menuText}>Tiền mặt</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        {/* More Details Button */}
        <TouchableOpacity style={styles.moreDetailsButton}>
          <Text style={styles.moreDetailsText}>THÊM CHI TIẾT</Text>
          <Ionicons name="chevron-down" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 40, // To center the title accounting for the close button
  },
  amountContainer: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  currencyContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginBottom: 8,
  },
  currencyText: {
    fontSize: 14,
    color: "#666",
  },
  amount: {
    fontSize: 40,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
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
    marginLeft: 12,
    color: "#666",
  },
  moreDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  moreDetailsText: {
    color: "#4CAF50",
    marginRight: 8,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#eee",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#666",
  },
});
