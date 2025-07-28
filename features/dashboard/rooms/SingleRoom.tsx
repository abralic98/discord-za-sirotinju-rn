import { Room } from "@/generated/graphql";
import routes from "@/lib/routes";
import { TextLg, TextXl2 } from "@/lib/typography";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { useRoomStore } from "./store";

export const SingleRoom = ({ room }: { room: Room | null }) => {
  const { push, navigate } = useRouter();
  const { setActiveRoom } = useRoomStore();
  if (!room) return null;
  return (
    <Pressable
      onPress={() => {
        setActiveRoom(room);
        navigate(`${routes.room}/${room.id}`);
      }}
      className="w-full h-16 bg-gray-800 flex flex-row items-center justify-start gap-4 p-4 rounded-lg"
    >
      <TextXl2 className="font-semibold">#</TextXl2>
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
