import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [totalBalance, setTotalBalance] = useState(0);

  const loadBalance = async () => {
    try {
      const savedBalance = await AsyncStorage.getItem("totalBalance");
      if (savedBalance !== null) {
        setTotalBalance(parseInt(savedBalance, 10));
      }
    } catch (error) {
      console.error("Error loading balance:", error);
    }
  };

  const updateBalance = async (newAmount) => {
    try {
      const newTotal = totalBalance + newAmount;
      setTotalBalance(newTotal);
      await AsyncStorage.setItem("totalBalance", newTotal.toString());
    } catch (error) {
      console.error("Error saving balance:", error);
    }
  };

  React.useEffect(() => {
    loadBalance();
  }, []);

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
