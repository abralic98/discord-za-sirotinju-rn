import { TextMd } from "@/lib/typography";
import React from "react";
import { View } from "react-native";
import { SingleSetting } from "./SingleSetting";
import routes from "@/lib/routes";
import { BellIcon, FingerprintIcon, UserIcon } from "lucide-nativewind";

export const SettingsList = () => {
  return (
    <View className="gap-4">
      <TextMd className="font-semibold opacity-60">Settings</TextMd>
      <SingleSetting
        icon={<UserIcon className="text-white" />}
        name="Account"
        route={routes.accountSettings}
      />

      <SingleSetting
        icon={<BellIcon className="text-white" />}
        name="Notifications"
        route={routes.notificationSettings}
      />
      <SingleSetting
        icon={<FingerprintIcon className="text-white" />}
        name="Biometrics"
        route={routes.biometricSettings}
      />
    </View>
  );
};
