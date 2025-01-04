import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTransaction } from "../../context/TransactionContext";

export default function TransactionsScreen({ navigation }) {
  const { transactions, deleteTransaction } = useTransaction();

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleDelete = (id, amount) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc muốn xóa giao dịch này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTransaction(id);
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa giao dịch");
          }
        },
      },
    ]);
  };

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() =>
        navigation.navigate("EditTransaction", { transaction: item })
      }>
      <View style={styles.transactionContent}>
        <View style={styles.transactionLeft}>
          <View style={[styles.categoryIcon, { backgroundColor: "#E8F5E9" }]}>
            <Ionicons
              name={item.categoryIcon || "cart-outline"}
              size={24}
              color="#4CAF50"
            />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.categoryText}>{item.category}</Text>
            {item.note && <Text style={styles.noteText}>{item.note}</Text>}
          </View>
        </View>

        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.amountText,
              item.type === "expense" ? styles.expenseText : styles.incomeText,
            ]}>
            {item.type === "expense" ? "-" : "+"}
            {formatCurrency(item.amount)}đ
          </Text>
          <TouchableOpacity
            onPress={() => handleDelete(item.id, item.amount)}
            style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="receipt-outline" size={80} color="#ddd" />
      <Text style={styles.emptyStateText}>Chưa có giao dịch nào</Text>
      <Text style={styles.emptyStateSubText}>
        Nhấn vào nút + để thêm giao dịch mới
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerTitle}>Text</Text> */}
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  listContainer: {
    flexGrow: 1,
  },
  transactionItem: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  transactionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    color: "#666",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  expenseText: {
    color: "#FF3B30",
  },
  incomeText: {
    color: "#4CAF50",
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666",
    marginTop: 16,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
});
