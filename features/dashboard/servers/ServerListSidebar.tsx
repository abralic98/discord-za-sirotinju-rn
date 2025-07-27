import { View } from "react-native";
import { ServerList } from "./components/ServerList";

export const ServerListSidebar = () => {
  return (
    <View className="w-24 h-full rounded-md pb-2 bg-dark-server-sidebar pl-2">
      <ServerList />
    </View>
  );
};
