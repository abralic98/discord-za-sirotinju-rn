import { SettingsList } from "@/features/settings/SettingsList";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountSettingsPage() {
  return (
    <View className="h-full p-4 bg-dark-server-sidebar ">
      <SettingsList />
    </View>
  );
}
