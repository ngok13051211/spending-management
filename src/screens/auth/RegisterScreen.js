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
import { useAuth } from "../../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  const handleRegister = async () => {
    try {
      if (!fullName || !email || !password) {
        Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
        return;
      }

      const userInfo = {
        fullName: fullName,
        email: email,
        username: email.split("@")[0],
      };

      await setUser(userInfo);

      navigation.navigate("Main");
    } catch (error) {
      Alert.alert("Lỗi", "Đăng ký thất bại");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={fullName}
        onChangeText={setFullName}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Bạn đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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
