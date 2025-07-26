import { TextSm } from "@/lib/typography";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsPage() {
  return (
    <SafeAreaView>
      <View>
        <TextSm>setting </TextSm>
      </View>
    </SafeAreaView>
  );
}
