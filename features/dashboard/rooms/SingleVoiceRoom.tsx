import { Room } from "@/generated/graphql";
import routes from "@/lib/routes";
import { TextLg } from "@/lib/typography";
import { useRouter } from "expo-router";
import { AudioLinesIcon } from "lucide-nativewind";
import React from "react";
import { Pressable } from "react-native";
import { useRoomStore } from "./store";

export const SingleVoiceRoom = ({ room }: { room: Room | null }) => {
  const { push } = useRouter();
  const { setActiveRoom } = useRoomStore();
  if (!room) return null;
  return (
    <Pressable
      onPress={() => {
        setActiveRoom(room);
        push(`${routes.room}/${room.id}`);
      }}
      className="w-full h-16 bg-gray-800 flex flex-row items-center justify-start gap-4 p-4 rounded-lg"
    >
      <AudioLinesIcon className="text-white" />
      <TextLg
        numberOfLines={1}
        ellipsizeMode="tail"
        className="font-semibold flex-1"
      >
        {room?.name}
      </TextLg>
    </Pressable>
  );
};
