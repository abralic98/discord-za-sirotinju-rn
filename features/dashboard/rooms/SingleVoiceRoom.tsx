import { Room } from "@/generated/graphql";
import { TextLg } from "@/lib/typography";
import { AudioLinesIcon } from "lucide-nativewind";
import React from "react";
import { View } from "react-native";

export const SingleVoiceRoom = ({ room }: { room: Room | null }) => {
  if (!room) return null;
  return (
    <View className="w-full h-16 bg-gray-800 flex flex-row items-center justify-start gap-4 p-4 rounded-lg">
      <AudioLinesIcon className="text-white" />
      <TextLg className="font-semibold">{room?.name}</TextLg>
    </View>
  );
};
