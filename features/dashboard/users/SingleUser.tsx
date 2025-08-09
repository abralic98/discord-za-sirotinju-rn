import { UserAvatar } from "@/components/UserAvatar";
import { useAuthStore } from "@/features/auth/store";
import { User } from "@/generated/graphql";
import { TextMd } from "@/lib/typography";
import { CrownIcon, MailIcon } from "lucide-nativewind";
import React from "react";
import { View } from "react-native";

interface Props {
  user: User | null;
  serverOwnerId?: string | null;
}
export const SingleUser = ({ user, serverOwnerId }: Props) => {
  const { user: currentUser } = useAuthStore();
  if (!user) return null;
  return (
    <View className="flex-row  items-center justify-between">
      <View className="flex-row gap-4 items-center">
        <UserAvatar withPresence={true} user={user} />
        <TextMd className="font-semibold">{user.username}</TextMd>
        {user.id === serverOwnerId && <CrownIcon className="text-yellow-500" />}
      </View>
      {user.id !== currentUser?.id && (
        <MailIcon className="w-10 h-10 text-slate-500" />
      )}
    </View>
  );
};
