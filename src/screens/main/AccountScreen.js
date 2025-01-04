import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

export default function AccountScreen({ navigation }) {
  const { userInfo, logout } = useAuth();

  // Thêm log để debug
  console.log("Current userInfo:", userInfo);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("Auth");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đăng xuất");
    }
  };

  // Kiểm tra và hiển thị dữ liệu mặc định nếu chưa có
  const defaultUser = {
    fullName: "Người dùng",
    email: "Email chưa cập nhật",
  };

  const userData = userInfo || defaultUser;
  const firstLetter = userData.fullName.charAt(0).toUpperCase();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quản lý tài khoản</Text>
      </View>

      {/* User Info Section */}
      <View style={styles.userSection}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userData.fullName}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="person-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Thông tin cá nhân</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Đổi mật khẩu</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Thông báo</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
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
  userSection: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F4D03F", // Màu vàng như trong ảnh
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  menuSection: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 12,
  },
  logoutButton: {
    margin: 20,
    padding: 16,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
