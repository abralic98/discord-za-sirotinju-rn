import { User, UserPresenceType } from "@/generated/graphql";
import { TextMd } from "@/lib/typography";
import React from "react";
import { View } from "react-native";

interface Props {
  serverUsers?: (User | null)[];
}

export const UserCount = ({ serverUsers }: Props) => {
  const calculateOnlineUsers = (): number => {
    let onlineUsers = 0;
    serverUsers?.forEach((user) => {
      if (user?.userPresence === UserPresenceType.Online) {
        onlineUsers += 1;
      }
    });
    return onlineUsers;
  };
  return (
    <View className="flex flex-row gap-4">
      <View className="flex flex-row gap-2 items-center justify-start">
        <View className="bg-green-500 w-3 h-3 rounded-full" />
        <TextMd className="font-semibold">{calculateOnlineUsers()} Online</TextMd>
      </View>
      <View className="flex flex-row gap-2 items-center justify-start">
        <View className="bg-gray-500 w-3 h-3 rounded-full" />
        <TextMd className="font-semibold">{serverUsers?.length} Members</TextMd>
      </View>
    </View>
  );
};
