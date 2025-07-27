import { Server } from "@/generated/graphql";
import { TextLg, TextMd } from "@/lib/typography";
import React from "react";
import { View } from "react-native";

export const SingleServer = ({ server }: { server: Server | null }) => {
  if (!server) return null;
  return (
    <View className="w-full h-80 bg-dark-server-sidebar rounded-xl flex flex-col gap-2 overflow-hidden">
      <View className="bg-red-500 w-full h-32" />
      <View className="flex gap-2 p-2">
        <TextLg>{server.name}</TextLg>
        <TextMd>{server.description}</TextMd>
      </View>
    </View>
  );
};
