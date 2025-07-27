import { Room } from "@/generated/graphql";
import { TextLg, TextXl2 } from "@/lib/typography";
import React from "react";
import { View } from "react-native";

export const SingleRoom = ({ room }: { room: Room | null }) => {
  if (!room) return null;
  return (
    <View className="w-full h-16 bg-gray-800 flex flex-row items-center justify-start gap-4 p-4 rounded-lg">
      <TextXl2 className="font-semibold">#</TextXl2>

      <TextLg
        numberOfLines={1}
        ellipsizeMode="tail"
        className="font-semibold flex-1"
      >
        {room?.name}
      </TextLg>
    </View>
  );
};
