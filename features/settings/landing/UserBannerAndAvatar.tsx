import EZLogoDark from "@/assets/logo/EZLogoDark";
import { UserAvatar } from "@/components/UserAvatar";
import { useAuthStore } from "@/features/auth/store";
import { TextXl } from "@/lib/typography";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

export const UserBannerAndAvatar = () => {
  const { user } = useAuthStore();

  const renderBanner = () => {
    if (user?.banner) {
      return (
        <Image
          alt="server banner"
          source={{ uri: user.banner }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      );
    } else {
      return (
        <View className="w-full h-44 bg-dark-active-server items-center justify-end pb-4">
          <EZLogoDark width={70} height={70} />
        </View>
      );
    }
  };
  return (
    <View className="w-full h-44 relative mb-14">
      {renderBanner()}
      <UserAvatar
        className="w-28 h-28 border-[5px] border-dark-border rounded-full absolute bottom-[-45] left-5"
        presenceClassName="w-6 h-6"
        user={user}
        withPresence={true}
      />
    </View>
  );
};
