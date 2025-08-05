import EZLogoDark from "@/assets/logo/EZLogoDark";
import { TextMd, TextXl3 } from "@/lib/typography";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BiometricLogin } from "@/features/auth/components/BiometricLogin";
import { GoogleLogin } from "@/features/auth/components/GoogleLogin";
import { Button } from "@/components/ui/Button";
import { ContactRoundIcon, LogInIcon } from "lucide-nativewind";
import { LoginAnimation } from "@/components/custom/LoginAnimation";

export default function LoginType() {
  return (
    <SafeAreaView>
      <LoginAnimation />
      <View className="items-center gap-4 p-10">
        <EZLogoDark />
        <TextXl3 className="font-bold">Ezcomms</TextXl3>
        <Button className="flex flex-row gap-4 rounded-2xl w-full">
          <LogInIcon className="text-white" />
          <TextMd className="font-semibold">Login</TextMd>
        </Button>
        <Button className="flex flex-row gap-4 rounded-2xl w-full">
          <ContactRoundIcon className="text-white" />
          <TextMd className="font-semibold">Register</TextMd>
        </Button>
        <BiometricLogin />
        <GoogleLogin />
      </View>
    </SafeAreaView>
  );
}
