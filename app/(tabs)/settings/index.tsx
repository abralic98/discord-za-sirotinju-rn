import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/features/auth/store";
import routes from "@/lib/routes";
import { TextMd, TextSm } from "@/lib/typography";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsPage() {
  const { clearAuth } = useAuthStore();
  const { replace } = useRouter();

  const logout = () => {
    clearAuth();
    replace(routes.login);
  };

  return (
    <SafeAreaView edges={["top"]}>
      <View className="h-full">
        <TextSm>setting </TextSm>
        <Button onPress={logout}>
          <TextMd>Logout</TextMd>
        </Button>
      </View>
    </SafeAreaView>
  );
}
