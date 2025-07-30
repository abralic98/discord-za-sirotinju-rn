import { ServerSettings } from "@/features/dashboard/rooms/server-settings/ServerSettings";
import { TextXl } from "@/lib/typography";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-nativewind";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServerSettingsPage() {
  const { back } = useRouter();

  return (
    <SafeAreaView edges={["top"]} className="bg-dark-server-sidebar p-4 gap-4">
      <View className="flex-row gap-4 items-center">
        <ArrowLeftIcon onPress={back} className="w-8 h-8 text-white" />
        <TextXl>Server Settings</TextXl>
      </View>
      <ScrollView className="h-full">
        <View className="w-full flex flex-col pb-12 h-full ">
          <ServerSettings />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
