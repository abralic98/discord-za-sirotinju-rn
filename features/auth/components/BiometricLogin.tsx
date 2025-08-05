import { Button } from "@/components/ui/Button";
import { TextMd } from "@/lib/typography";
import { FingerprintIcon } from "lucide-nativewind";
import React from "react";
import { View } from "react-native";

export const BiometricLogin = () => {
  return (
    <View className="w-full">
      <Button className="flex flex-row gap-4 rounded-2xl">
        <FingerprintIcon className="w-8 h-8 text-white" />
        <TextMd className="font-semibold">Biometric Login</TextMd>
      </Button>
    </View>
  );
};
