import { UserAvatar } from "@/components/UserAvatar";
import { Message } from "@/generated/graphql";
import { formatDate, formatWSDate } from "@/helpers/Date";
import { TextMd } from "@/lib/typography";
import React from "react";
import { View } from "react-native";

interface Props {
  message: Message | null;
  ws?: boolean;
}

export const SingleMessage = ({ message, ws = false }: Props) => {
  if (!message) return null;

  const renderDate = (): string => {
    if (ws) {
      console.log(formatWSDate(message?.dateCreated), "jebeni ws date");
      return formatWSDate(message?.dateCreated);
    } else {
      return formatDate(message?.dateCreated);
    }
  };
  return (
    <View className="flex-row gap-4 items-start min-h-14 w-full">
      <UserAvatar user={message.author} />
      <View className="flex-1 flex-col">
        <View className="flex-row justify-between w-full">
          <TextMd className="font-semibold">{message.author?.username}</TextMd>
          <TextMd className="font-semibold">{renderDate()}</TextMd>
        </View>
        <TextMd className="w-full" ellipsizeMode="tail" numberOfLines={10}>
          {message.text}
        </TextMd>
      </View>
    </View>
  );
};
