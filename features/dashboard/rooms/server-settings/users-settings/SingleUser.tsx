import { UserAvatar } from "@/components/UserAvatar";
import { useAuthStore } from "@/features/auth/store";
import { User } from "@/generated/graphql";
import { TextMd } from "@/lib/typography";
import { MailIcon } from "lucide-nativewind";
import React from "react";
import { View } from "react-native";
import { UserActions } from "./UserActions";

export const SingleUser = ({ user }: { user?: User | null }) => {
  const { user: currentUser } = useAuthStore();
  if (!user) return null;
  return (
    <View className="flex-row items-center justify-between pb-4">
      <View className="flex-row gap-4 items-center">
        <UserAvatar withPresence={true} user={user} />
        <TextMd className="font-semibold">{user?.username}</TextMd>
      </View>
      <View className="flex-row items-center gap-4">
        {user.id !== currentUser?.id && (
          <MailIcon className="w-10 h-10 text-slate-500" />
        )}
        {currentUser?.id !== user.id && <UserActions user={user} />}
      </View>
    </View>
  );
};
