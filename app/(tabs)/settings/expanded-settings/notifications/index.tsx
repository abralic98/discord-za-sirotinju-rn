import { TextMd } from "@/lib/typography";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountSettingsPage() {
  return (
    <SafeAreaView className="bg-dark-server-sidebar" edges={["top"]}>
      <View className="h-full p-4 ">
        <TextMd>notifications</TextMd>
      </View>
    </SafeAreaView>
  );
}
