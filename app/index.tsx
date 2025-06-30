import routes from "@/lib/routes";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { push } = useRouter();
  return (
    <View>
      <Text className="text-white">Edit kita app/index.tsx to edit this screen.</Text>
      <Button title="kita" onPress={() => push(routes.login)} />
    </View>
  );
}
