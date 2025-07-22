import "../global.css";
import Toast from "react-native-toast-message";

import { ThemeProvider, DarkTheme } from "@react-navigation/native";

import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/queryClient";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DarkTheme}>
        <Stack />
        <Toast />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
