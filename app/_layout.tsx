import "../global.css";
import Toast from "react-native-toast-message";

import { ThemeProvider, DarkTheme } from "@react-navigation/native";

import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/queryClient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFirebase } from "@/hooks/useFirebase";

export default function RootLayout() {
  useFirebase();
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "gray" }}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <ThemeProvider value={DarkTheme}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: "fade",
                }}
              />
              <Toast />
            </ThemeProvider>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
