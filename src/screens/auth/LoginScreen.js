import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import api from "../../config/api";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleLogin = async () => {
    try {
      // Giả lập response từ API
      const userInfo = {
        fullName: fullName,
        email: email || "",
        username: "",
      };

      console.log("Login with user:", userInfo); // debug
      await setUser(userInfo);

      navigation.navigate("Main");
    } catch (error) {
      console.error("Login error:", error); //  debug
      Alert.alert("Lỗi", "Đăng nhập thất bại");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Bạn chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    position: "relative",
    top: 40,
    left: 0,
    right: 0,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  link: {
    color: "#007AFF",
    textAlign: "center",
    marginTop: 15,
  },
});
