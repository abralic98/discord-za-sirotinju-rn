import { RoomList } from "@/features/dashboard/rooms/RoomList";
import { ServerListSidebar } from "@/features/dashboard/servers/ServerListSidebar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardPage() {
  return (
    <SafeAreaView edges={["top"]}>
      <View className="flex flex-row h-full">
        <ServerListSidebar />
        <RoomList />
      </View>
    </SafeAreaView>
  );
}
