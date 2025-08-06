import { InboxList } from "@/features/messaging/InboxList";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DiscoveryPage() {
  return (
    <View className="bg-dark-server-sidebar h-full">
      <InboxList />
    </View>
  );
}
