import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function StatisticsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Thống kê theo ngày */}
      <View style={styles.statisticCard}>
        <Text style={styles.statisticTitle}>Thống kê theo ngày</Text>
        {/* Thêm logic hiển thị thống kê theo ngày ở đây */}
      </View>

      {/* Thống kê theo tháng */}
      <View style={styles.statisticCard}>
        <Text style={styles.statisticTitle}>Thống kê theo tháng</Text>
        {/* Thêm logic hiển thị thống kê theo tháng ở đây */}
      </View>

      {/* Thống kê theo năm */}
      <View style={styles.statisticCard}>
        <Text style={styles.statisticTitle}>Thống kê theo năm</Text>
        {/* Thêm logic hiển thị thống kê theo năm ở đây */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  statisticCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statisticTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
