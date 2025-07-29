import { UserList } from "@/features/dashboard/users/UserList";
import { TextLg } from "@/lib/typography";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UsersListPage() {
  return (
    <SafeAreaView edges={["top"]} className="bg-dark-server-sidebar">
      <View className="w-full h-full gap-4 p-4">
        <TextLg>Users</TextLg>
        <UserList />
      </View>
    </SafeAreaView>
  );
}
