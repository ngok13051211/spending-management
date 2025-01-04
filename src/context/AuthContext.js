import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  // Lưu thông tin user
  const setUser = async (user) => {
    try {
      console.log("Saving user info:", user);
      await AsyncStorage.setItem("userInfo", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  // Lấy thông tin user khi khởi động app
  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("userInfo");
      console.log("Loaded user info:", savedUser);
      if (savedUser) {
        setUserInfo(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error loading user info:", error);
    }
  };

  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUser,
        logout: async () => {
          try {
            await AsyncStorage.removeItem("userInfo");
            setUserInfo(null);
          } catch (error) {
            console.error("Error during logout:", error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
