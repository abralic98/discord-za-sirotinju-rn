import { MessageList } from "@/features/dashboard/messages/MessageList";
import { RoomHeader } from "@/features/dashboard/messages/RoomHeader";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoomPage() {
  return (
    <SafeAreaView edges={["top"]} className="bg-dark-server-sidebar">
      <View className="w-full h-full bg-dark-active-server">
        <RoomHeader />
        <MessageList />
      </View>
    </SafeAreaView>
  );
}
