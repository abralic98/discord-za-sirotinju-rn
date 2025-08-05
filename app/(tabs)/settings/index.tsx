import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/features/auth/store";
import { MemberSince } from "@/features/settings/landing/MemberSince";
import { UserBannerAndAvatar } from "@/features/settings/landing/UserBannerAndAvatar";
import { YourFriends } from "@/features/settings/landing/YourFriends";
import routes from "@/lib/routes";
import { TextMd, TextXl } from "@/lib/typography";
import { useRouter } from "expo-router";
import { LogOutIcon, SettingsIcon } from "lucide-nativewind";
import { View } from "react-native";

export default function SettingsPage() {
  const { clearAuth, user } = useAuthStore();
  const { replace, push } = useRouter();

  const logout = () => {
    clearAuth();
    replace(routes.loginType);
  };

  return (
    <View className="h-full bg-dark-server-sidebar relative">
      <UserBannerAndAvatar />
      <View className="p-4 gap-4">
        <TextXl>{user?.username}</TextXl>
        <TextMd>{user?.description}</TextMd>
        <MemberSince date={user?.dateCreated} />
        <YourFriends />
        <Button
          onPress={() => push(routes.expandedSettings)}
          className="flex flex-row gap-4 rounded-2xl"
        >
          <SettingsIcon className="text-white" />
          <TextMd className="font-semibold">Settings</TextMd>
        </Button>
      </View>
      <View className="gap-4 absolute bottom-1 left-0 w-full p-4">
        <Button
          onPress={logout}
          variant={"destructive"}
          className="flex flex-row gap-4 rounded-2xl  w-full"
        >
          <LogOutIcon className="text-white" />
          <TextMd className="font-semibold">Logout</TextMd>
        </Button>
      </View>
    </View>
  );
}
