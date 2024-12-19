import * as SecureStore from "expo-secure-store";

export const logout = async (navigation) => {
  try {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" }],
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
};
