import { User } from "@/generated/graphql";
import { Image } from "expo-image";
import { UserIcon } from "lucide-nativewind";
import React from "react";
import { View } from "react-native";
import { UserPresence } from "./custom/user/UserPresence";
import { cn } from "@/lib/utils";

interface Props {
  user?: User | null;
  withPresence?: boolean;
  className?: string;
  presenceClassName?: string;
}
export const UserAvatar = ({ user, withPresence, className, presenceClassName }: Props) => {
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
        <View className="w-full h-full rounded-full bg-dark-active-server items-center justify-center">
          <UserIcon className="text-white" />
        </View>
      );
    }
  };
  return (
    <View className={cn("w-14 h-14", className)}>
      {renderAvatar()}
      {withPresence && <UserPresence className={presenceClassName} presence={user?.userPresence} />}
    </View>
  );
};
