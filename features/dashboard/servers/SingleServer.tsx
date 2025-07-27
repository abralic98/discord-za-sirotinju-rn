import { Server } from "@/generated/graphql";
import { TextXl3 } from "@/lib/typography";
import React from "react";
import { Pressable, View } from "react-native";
import { Image } from "expo-image";
import { useRoomStore } from "../rooms/store";

export const SingleServer = ({ server }: { server: Server | null }) => {
  const { setActiveServer } = useRoomStore();
  if (!server) return null;

  const renderIcon = () => {
    if (server?.serverImg) {
      return (
        <Image
          alt="server icon"
          source={{ uri: server.serverImg }}
          style={{ width: "100%", height: "100%", borderRadius: 9999 }}
          contentFit="cover"
        />
      );
    } else {
      if (server?.name)
        return (
          <TextXl3 className="font-semibold">
            {server?.name.slice(0, 2)}
          </TextXl3>
        );
    }
  };
  return (
    <Pressable
      className="w-20 h-20 bg-dark-server rounded-full flex items-center justify-center"
      onPress={() => {
        setActiveServer(server);
      }}
    >
      {renderIcon()}
    </Pressable>
  );
};
