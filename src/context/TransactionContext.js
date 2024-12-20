import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Lấy danh sách giao dịch
  const loadTransactions = async () => {
    try {
      const saved = await AsyncStorage.getItem("transactions");
      if (saved) {
        setTransactions(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  };

  // Thêm giao dịch mới
  const addTransaction = async (transaction) => {
    try {
      const newTransaction = {
        id: Date.now().toString(),
        ...transaction,
        createdAt: new Date().toISOString(),
      };
      const updatedTransactions = [...transactions, newTransaction];
      setTransactions(updatedTransactions);
      await AsyncStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactions)
      );
      return newTransaction;
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw error;
    }
  };

  // Cập nhật giao dịch
  const updateTransaction = async (id, updatedData) => {
    try {
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updatedData } : transaction
      );
      setTransactions(updatedTransactions);
      await AsyncStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactions)
      );
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  };

  // Xóa giao dịch
  const deleteTransaction = async (id) => {
    try {
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );
      setTransactions(updatedTransactions);
      await AsyncStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactions)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        loadTransactions,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
