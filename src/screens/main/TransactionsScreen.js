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

  const handleDelete = (id, amount) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa giao dịch này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTransaction(id);
            // Cập nhật lại số dư tổng
            // TODO: Implement logic to update total balance
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
      <View style={styles.transactionLeft}>
        <View style={styles.categoryIcon}>
          <Ionicons name="cart-outline" size={24} color="#666" />
        </View>
        <View>
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.noteText}>{item.note}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.amountText,
            item.type === "expense" ? styles.expenseText : styles.incomeText,
          ]}>
          {item.type === "expense" ? "-" : "+"}
          {item.amount.toLocaleString()}đ
        </Text>
        <TouchableOpacity
          onPress={() => handleDelete(item.id, item.amount)}
          style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có giao dịch nào</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... styles
});
