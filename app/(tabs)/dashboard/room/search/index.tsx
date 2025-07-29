import { Filters } from "@/features/dashboard/search/Filters";
import { TextLg } from "@/lib/typography";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchRoomPage() {
  return (
    <SafeAreaView edges={["top"]} className="bg-dark-server-sidebar">
      <View className="w-full p-4 h-full">
        <TextLg>Search</TextLg>
        <Filters />
      </View>
    </SafeAreaView>
  );
}
