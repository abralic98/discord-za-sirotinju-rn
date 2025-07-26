import { TextSm } from "@/lib/typography";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardPage() {
  return (
    <SafeAreaView>
      <View>
        <TextSm>Dashboardis </TextSm>
      </View>
    </SafeAreaView>
  );
}
