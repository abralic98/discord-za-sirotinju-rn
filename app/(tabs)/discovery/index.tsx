import { ServerList } from "@/features/discovery/ServerList";
import { TextSm, TextXl3 } from "@/lib/typography";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DiscoveryPage() {
  return (
    <SafeAreaView>
      <View className="p-4 w-full">
        <TextXl3>Find servers</TextXl3>
        <ServerList />
      </View>
    </SafeAreaView>
  );
}
