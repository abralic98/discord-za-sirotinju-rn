import { TextMd } from "@/lib/typography";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function RoomPage() {
  const params = useLocalSearchParams();
  console.log(params);
  return (
    <View className="w-full h-full bg-red-500">
      <TextMd>{String(params)}</TextMd>
    </View>
  );
}
