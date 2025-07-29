import { Room } from "@/generated/graphql";
import { TextLg } from "@/lib/typography";
import React from "react";
import { Pressable, View } from "react-native";
import { useRoomStore } from "../rooms/store";
import { ArrowLeftIcon, SearchIcon, UsersIcon } from "lucide-nativewind";
import { useRouter } from "expo-router";
import routes from "@/lib/routes";

export const RoomHeader = () => {
  const { activeRoom } = useRoomStore();
  const { back, push } = useRouter();
  return (
    <View className="bg-dark-server h-20 flex-row items-center justify-between px-4">
      <View className="flex-row gap-4">
        <Pressable onPress={back}>
          <ArrowLeftIcon className="text-white" />
        </Pressable>
        <TextLg># {activeRoom?.name}</TextLg>
      </View>
      <View className="flex-row gap-4">
        <UsersIcon
          onPress={() => push(`${routes.serverUsers}`)}
          className="text-white"
        />
        <SearchIcon
          onPress={() => push(`${routes.roomSearch}`)}
          className="text-white"
        />
      </View>
    </View>
  );
};
