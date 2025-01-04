import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBudget } from "../../context/BudgetContext";
import { useTransaction } from "../../context/TransactionContext";
import EditBalanceModal from "../../components/EditBalanceModal";
import { useNavigation } from "@react-navigation/native";

export default function OverviewScreen() {
  const { totalBalance } = useBudget();
  const { transactions } = useTransaction();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Tính tổng thu và chi trong tháng hiện tại
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter((transaction) => {
    const transDate = new Date(transaction.createdAt);
    return (
      transDate.getMonth() === currentMonth &&
      transDate.getFullYear() === currentYear
    );
  });

  const totalExpense = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.balanceCard}
          onPress={() => setIsModalVisible(true)}>
          <View style={styles.balanceContent}>
            <Text style={styles.balanceLabel}>Tổng số dư</Text>
            <Text style={styles.balanceAmount}>
              {formatCurrency(totalBalance)} Vnd
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.reportCard}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportTitle}>Báo cáo tháng này</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Statistics")}
              style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reportContent}>
            <View style={styles.reportColumn}>
              <Text style={styles.reportLabel}>Tổng đã chi</Text>
              <Text style={[styles.reportAmount, styles.expenseText]}>
                {formatCurrency(totalExpense)}
              </Text>
            </View>
            <View style={[styles.reportColumn, styles.borderLeft]}>
              <Text style={styles.reportLabel}>Tổng thu</Text>
              <Text style={[styles.reportAmount, styles.incomeText]}>
                {formatCurrency(totalIncome)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recentTransactions}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Giao dịch gần đây</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Transactions")}>
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          {transactions.length > 0 ? (
            <View style={styles.transactionList}>
              {transactions.slice(0, 5).map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <Text style={styles.transactionText}>
                    {transaction.category || "Nhóm"}
                  </Text>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.type === "expense"
                        ? styles.expenseText
                        : styles.incomeText,
                    ]}>
                    {transaction.type === "expense" ? "-" : "+"}
                    {formatCurrency(transaction.amount)} Vnd
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyTransactions}>
              <Text style={styles.emptyText}>
                Giao dịch đã thêm sẽ hiển thị ở đây
              </Text>
            </View>
          )}
        </View>

        <EditBalanceModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          currentBalance={totalBalance}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
  },
  balanceCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceContent: {
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  reportCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reportTitle: {
    fontSize: 16,
    color: "#666",
  },
  reportContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reportColumn: {
    flex: 1,
    alignItems: "center",
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: "#eee",
  },
  reportLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  reportAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  expenseText: {
    color: "#FF3B30",
  },
  incomeText: {
    color: "#4CAF50",
  },
  recentTransactions: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#666",
  },
  viewAllText: {
    fontSize: 14,
    color: "#4CAF50",
    lineHeight: 20,
    textAlign: "right",
    marginLeft: 10,
  },
  transactionList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  transactionText: {
    fontSize: 14,
    color: "#666",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
  emptyTransactions: {
    padding: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  viewAllContainer: {
    paddingVertical: 0,
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    marginTop: -2,
  },
});
