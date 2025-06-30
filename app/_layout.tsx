import "../global.css";

import { ThemeProvider, DarkTheme } from "@react-navigation/native";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack />
    </ThemeProvider>
  );
}
