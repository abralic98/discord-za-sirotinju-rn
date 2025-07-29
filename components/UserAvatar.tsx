import { User } from "@/generated/graphql";
import { Image } from "expo-image";
import { UserIcon } from "lucide-nativewind";
import React from "react";
import { View } from "react-native";
import { UserPresence } from "./custom/user/UserPresence";

interface Props {
  user?: User | null;
  withPresence?: boolean;
}
export const UserAvatar = ({ user, withPresence }: Props) => {
  const renderAvatar = () => {
    if (user?.avatar) {
      return (
        <Image
          alt="user avatar"
          source={{ uri: user?.avatar }}
          style={{ width: "100%", height: "100%", borderRadius: 9999 }}
          contentFit="cover"
        />
      );
    } else {
      return (
        <View className="w-20 h-20 rounded-full">
          <UserIcon className="text-white" />
        </View>
      );
    }
  };
  return (
    <View className="w-14 h-14 ">
      {renderAvatar()}
      {withPresence && <UserPresence presence={user?.userPresence} />}
    </View>
  );
};
