import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

// Auth screens
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";

// Main screens
import OverviewScreen from "./src/screens/main/OverviewScreen";
import TransactionsScreen from "./src/screens/main/TransactionsScreen";
import BudgetScreen from "./src/screens/main/BudgetScreen";
import AccountScreen from "./src/screens/main/AccountScreen";
import AddTransactionScreen from "./src/screens/transaction/AddTransactionScreen";
import AddBudgetScreen from "./src/screens/budget/AddBudgetScreen";
import EditTransactionScreen from "./src/screens/transaction/EditTransactionScreen";

import { BudgetProvider } from "./src/context/BudgetContext";
import { TransactionProvider } from "./src/context/TransactionContext";
import { AuthProvider } from "./src/context/AuthContext";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Overview":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Transactions":
              iconName = focused ? "book" : "book-outline";
              break;
            case "Budget":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Account":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        headerShown: true,
      })}>
      <Tab.Screen
        name="Overview"
        component={OverviewScreen}
        options={{
          title: "Tổng quan",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          title: "Sổ giao dịch",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("AddTransactionScreen")}
              style={{
                top: -20,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#4CAF50",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Ionicons name="add" size={40} color="white" />
              </View>
            </TouchableOpacity>
          ),
          tabBarLabel: () => null,
        })}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          title: "Ngân sách",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Tài khoản",
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <BudgetProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
              <Stack.Screen
                name="Auth"
                component={AuthNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddTransactionScreen"
                component={AddTransactionScreen}
                options={{
                  presentation: "modal",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AddBudget"
                component={AddBudgetScreen}
                options={{
                  presentation: "modal",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="EditTransaction"
                component={EditTransactionScreen}
                options={{
                  title: "Sửa giao dịch",
                  presentation: "modal",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BudgetProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}
