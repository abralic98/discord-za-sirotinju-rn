import { Biometrics } from "@/features/settings/biometrics/Biometrics";
import { View } from "react-native";

export default function BiometricSettingsPage() {
  return (
    <View className="h-full p-4 bg-dark-server-sidebar ">
      <Biometrics />
    </View>
  );
}
