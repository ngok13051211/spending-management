import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BoxIcon() {
  return (
    <View style={{ opacity: 0.5 }}>
      <Ionicons name="cube-outline" size={100} color="#ddd" />
    </View>
  );
}
