import EZLogoDark from "@/assets/logo/EZLogoDark";
import { TextMd, TextXl3 } from "@/lib/typography";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BiometricLogin } from "@/features/auth/components/BiometricLogin";
import { GoogleLogin } from "@/features/auth/components/GoogleLogin";
import { ContactRoundIcon, LogInIcon } from "lucide-nativewind";
import { LoginAnimation } from "@/components/custom/LoginAnimation";
import { ModifiedPressable } from "@/features/auth/components/ModifiedPressable";
import routes from "@/lib/routes";
import { useRouter } from "expo-router";

export default function LoginType() {
  const { push } = useRouter();

  return (
    <SafeAreaView className="bg-dark-server-sidebar h-full">
      <LoginAnimation />
      <View className="items-center gap-4 p-10">
        <EZLogoDark />
        <TextXl3 className="font-bold">Ezcomms</TextXl3>
        <View className="w-full flex flex-row flex-wrap justify-around gap-4 pt-10">
          <ModifiedPressable action={() => push(routes.login)}>
            <LogInIcon className="text-white w-10 h-10" />
            <TextMd className="font-semibold">Login</TextMd>
          </ModifiedPressable>
          <ModifiedPressable action={() => push(routes.register)}>
            <ContactRoundIcon className="text-white w-10 h-10" />
            <TextMd className="font-semibold">Register</TextMd>
          </ModifiedPressable>
          <BiometricLogin />
          <GoogleLogin />
        </View>
      </View>
    </SafeAreaView>
  );
}
