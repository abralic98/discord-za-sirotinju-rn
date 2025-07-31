import { UserAvatar } from "@/components/UserAvatar";
import { BannedUser } from "@/generated/graphql";
import { TextMd } from "@/lib/typography";
import { MailIcon } from "lucide-nativewind";
import React from "react";
import { View } from "react-native";
import { BanInfoModal } from "./BanInfoModal";

export const SingleBannedUser = ({ user }: { user?: BannedUser | null }) => {
  if (!user) return null;
  return (
    <View className="flex-row items-center justify-between pb-4">
      <View className="flex-row gap-4 items-center">
        <UserAvatar withPresence={true} user={user.user} />
        <TextMd className="font-semibold">{user?.user.username}</TextMd>
      </View>
      <View className="flex-row items-center gap-4">
        <MailIcon className="w-10 h-10 text-slate-500" />
        <BanInfoModal user={user} />
      </View>
    </View>
  );
};
