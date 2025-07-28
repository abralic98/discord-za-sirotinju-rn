import { Room } from "@/generated/graphql";
import { TextLg } from "@/lib/typography";
import React from "react";
import { Pressable, View } from "react-native";
import { useRoomStore } from "../rooms/store";
import { ArrowLeftIcon, SearchIcon, UsersIcon } from "lucide-nativewind";
import { useRouter } from "expo-router";

export const RoomHeader = () => {
  const { activeRoom } = useRoomStore();
  const { back } = useRouter();
  return (
    <View className="bg-dark-server h-20 flex-row items-center justify-between px-4">
      <View className="flex-row gap-4">
        <Pressable onPress={back}>
          <ArrowLeftIcon className="text-white" />
        </Pressable>
        <TextLg># {activeRoom?.name}</TextLg>
      </View>
      <View className="flex-row gap-4">
        <UsersIcon className="text-white" />
        <SearchIcon className="text-white" />
      </View>
    </View>
  );
};
