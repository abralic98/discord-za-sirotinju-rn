import "../global.css";
import Toast from "react-native-toast-message";

import { ThemeProvider, DarkTheme } from "@react-navigation/native";

import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/queryClient";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={DarkTheme}>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
