import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [totalBalance, setTotalBalance] = useState(0);
  const { userInfo } = useAuth();

  const getBalanceKey = () => `totalBalance_${userInfo?.email || "guest"}`;

  const loadBalance = async () => {
    try {
      const savedBalance = await AsyncStorage.getItem(getBalanceKey());
      if (savedBalance !== null) {
        setTotalBalance(parseInt(savedBalance, 10));
      } else {
        setTotalBalance(0);
      }
    } catch (error) {
      console.error("Error loading balance:", error);
    }
  };

  const updateBalance = async (newAmount) => {
    try {
      const newTotal = totalBalance + newAmount;
      setTotalBalance(newTotal);
      await AsyncStorage.setItem(getBalanceKey(), newTotal.toString());
    } catch (error) {
      console.error("Error saving balance:", error);
    }
  };

  React.useEffect(() => {
    if (userInfo) {
      loadBalance();
    } else {
      setTotalBalance(0);
    }
  }, [userInfo]);

  return (
    <BudgetContext.Provider
      value={{
        totalBalance,
        updateBalance,
        loadBalance,
      }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
