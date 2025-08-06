import { UserAvatar } from "@/components/UserAvatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Inbox } from "@/generated/graphql";
import { formatDate } from "@/helpers/Date";
import routes from "@/lib/routes";
import { TextMd } from "@/lib/typography";
import { useRouter } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable, View } from "react-native";
import { useInboxStore } from "../store";

export const SingleInbox = ({ inbox }: { inbox: Inbox | null }) => {
  const { user: currentUser } = useAuth();
  const { push } = useRouter();
  const { setActiveInbox } = useInboxStore();
  if (!inbox) return null;

  const inboxTitle = (): ReactNode | string => {
    if (!inbox.users) return null;

    if (inbox.users.length === 1) {
      return (
        <TextMd className="h-13 flex items-center justify-center">
          User left chat
        </TextMd>
      );
    }

    if (inbox.users.length === 2) {
      const secondUser = inbox.users.find(
        (user) => user?.id !== currentUser?.id,
      );
      return <TextMd className="font-semibold">{secondUser?.username}</TextMd>;
    }

    if (inbox.users.length > 2) {
      return (
        <TextMd className="font-semibold">
          {inbox.users.map((user) => ` ${user?.username} `)}
        </TextMd>
      );
    }
    return [];
  };

  const inboxAvatar = (): ReactNode => {
    if (!inbox.users) return "";
    if (inbox.users?.length === 2) {
      const secondUser = inbox.users.find(
        (user) => user?.id !== currentUser?.id,
      );
      return <UserAvatar withPresence={true} user={secondUser} />;
    }
    if (inbox.users.length > 2) {
      return <UserAvatar />;
    }
  };

  const inboxDescription = () => {
    if (inbox.lastMessage?.text) {
      const isMyMessage = inbox.lastMessage.author?.id === currentUser?.id;
      const user = isMyMessage ? "You" : inbox.lastMessage.author?.username;
      return (
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row gap-2">
            <TextMd className="font-semibold">{user}:</TextMd>
            <TextMd>{inbox.lastMessage?.text}</TextMd>
          </View>
          <TextMd>{formatDate(inbox.lastMessage.dateCreated)}</TextMd>
        </View>
      );
    } else return <TextMd>{inbox.users?.length} members</TextMd>;
  };
  console.log(inbox.id);

  return (
    <Pressable
      className="w-full h-20 bg-dark-active-server rounded-lg flex flex-row gap-4 items-center px-4"
      onPress={() => {
        setActiveInbox(inbox);
        push(`${routes.dm}/${inbox.id}`);
      }}
    >
      {inboxAvatar()}
      <View className="flex-1">
        {inboxTitle()}
        {inboxDescription()}
      </View>
    </Pressable>
  );
};
