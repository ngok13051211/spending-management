import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BudgetScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.emptyState}>
        <View style={styles.iconContainer}>
          <Ionicons name="cube-outline" size={80} color="#ddd" />
        </View>

        <Text style={styles.title}>Bạn chưa có ngân sách</Text>

        <Text style={styles.description}>
          Bắt đầu tiết kiệm bằng cách tạo ngân sách và chúng tôi sẽ giúp bạn
          kiểm soát ngân sách
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddBudget")}>
          <Text style={styles.buttonText}>Tạo ngân sách</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});
