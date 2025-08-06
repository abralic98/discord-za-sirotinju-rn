import { UserAvatar } from "@/components/UserAvatar";
import { DirectMessage, Message } from "@/generated/graphql";
import { formatDate, formatWSDate } from "@/helpers/Date";
import { TextMd } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { Image } from "expo-image";
import React, { useState } from "react";
import { View } from "react-native";

interface Props {
  message: Message | DirectMessage | null;
}

export const SingleMessage = ({ message }: Props) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  if (!message) return null;

  const renderDate = () => {
    const formated = formatDate(message.dateCreated);
    if (formated === "invalid date") return formatWSDate(message.dateCreated);
    else return formated;
  };
  const renderMessage = () => {
    if (message.text !== "") {
      return (
        <TextMd className="w-full" ellipsizeMode="tail" numberOfLines={10}>
          {message.text}
        </TextMd>
      );
    }
    if (message.imageUrl) {
      return (
        <Image
          alt="uploaded-image"
          source={{ uri: message.imageUrl }}
          style={{
            width: "100%",
            aspectRatio,
            borderRadius: 20
          }}
          contentFit="cover"
          onLoad={({ source }) => {
            if (source?.width && source?.height) {
              setAspectRatio(source.width / source.height);
            }
          }}
        />
      );
    }
  };
  return (
    <View className="flex-row gap-4 items-start min-h-14 w-full">
      <UserAvatar user={message.author} />
      <View className={cn("flex-1 flex-col", message.imageUrl && "gap-4")}>
        <View className="flex-row justify-between w-full">
          <TextMd className="font-semibold">{message.author?.username}</TextMd>
          <TextMd className="font-semibold">{renderDate()}</TextMd>
        </View>
        {renderMessage()}
      </View>
    </View>
  );
};
