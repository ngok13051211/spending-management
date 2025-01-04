import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const { userInfo } = useAuth();

  // Tạo key riêng cho từng user
  const getTransactionsKey = () => `transactions_${userInfo?.email || "guest"}`;

  // Lấy danh sách giao dịch
  const loadTransactions = async () => {
    try {
      const saved = await AsyncStorage.getItem(getTransactionsKey());
      if (saved) {
        setTransactions(JSON.parse(saved));
      } else {
        setTransactions([]); // Khởi tạo mảng rỗng cho user mới
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
        getTransactionsKey(),
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
        getTransactionsKey(),
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
        getTransactionsKey(),
        JSON.stringify(updatedTransactions)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  };

  // Load giao dịch khi userInfo thay đổi (đăng nhập/đăng xuất)
  React.useEffect(() => {
    if (userInfo) {
      loadTransactions();
    } else {
      setTransactions([]); // Reset state khi không có user (không xóa dữ liệu)
    }
  }, [userInfo]);

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
