import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBudget } from "../../context/BudgetContext";

export default function OverviewScreen() {
  const { totalBalance } = useBudget();

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Ví của tôi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ví của tôi</Text>
        <View style={styles.walletItem}>
          <View style={styles.walletIcon}>
            <Ionicons name="document-outline" size={24} color="#666" />
          </View>
          <Text style={styles.walletLabel}>Tổng số dư</Text>
          <Text style={styles.walletAmount}>
            {formatCurrency(totalBalance)} đ
          </Text>
        </View>
      </View>

      {/* Báo cáo tháng này */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Báo cáo tháng này</Text>
        <View style={styles.reportContainer}>
          <View style={styles.reportItem}>
            <Text style={styles.reportLabel}>Tổng đã chi</Text>
            <Text style={[styles.reportAmount, styles.expenseAmount]}>0</Text>
          </View>
          <View style={styles.reportDivider} />
          <View style={styles.reportItem}>
            <Text style={styles.reportLabel}>Tổng thu</Text>
            <Text style={[styles.reportAmount, styles.incomeAmount]}>0</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>{/* Placeholder for chart */}</View>
      </View>

      {/* Giao dịch gần đây */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Giao dịch gần đây</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllLink}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionList}>
          <Text style={styles.emptyText}></Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  walletItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
  },
  walletIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  walletLabel: {
    flex: 1,
    fontSize: 16,
  },
  walletAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reportContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  reportItem: {
    flex: 1,
    alignItems: "center",
  },
  reportDivider: {
    width: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 20,
  },
  reportLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  reportAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  expenseAmount: {
    color: "#FF3B30",
  },
  incomeAmount: {
    color: "#4CAF50",
  },
  chartContainer: {
    height: 200,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllLink: {
    color: "#4CAF50",
    fontSize: 14,
  },
  transactionList: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 16,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
  },
});
