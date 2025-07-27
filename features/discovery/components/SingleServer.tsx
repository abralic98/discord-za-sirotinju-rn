import { Server } from "@/generated/graphql";
import { TextLg, TextMd } from "@/lib/typography";
import { Image } from "expo-image";
import { ServerIcon } from "lucide-nativewind";
import React from "react";
import { View } from "react-native";
import { UserCount } from "./UserCount";
import { JoinServer } from "./JoinServer";

export const SingleServer = ({ server }: { server: Server | null }) => {
  if (!server) return null;

  const renderBanner = () => {
    if (server?.banner) {
      return (
        <Image
          alt="server banner"
          source={{ uri: server.banner }}
          style={{ width: "100%", height: 128 }}
          contentFit="cover"
        />
      );
    } else {
      if (server?.name)
        return (
          <View className="w-full h-32 bg-dark-active-server items-center justify-center">
            <ServerIcon className="text-white w-10 h-10" />
          </View>
        );
    }
  };

  const renderIcon = () => {
    if (server?.serverImg) {
      return (
        <View>
          <View className="w-32 h-10" />
          <Image
            alt="server icon"
            source={{ uri: server.serverImg }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 99,
              position: "absolute",
              top: -50,
              left: 10,
            }}
            contentFit="cover"
          />
        </View>
      );
    }
  };
  return (
    <View className="w-full min-h-80 bg-dark-server-sidebar rounded-xl flex flex-col justify-between  overflow-hidden">
      {renderBanner()}
      <View className="flex gap-4 p-4">
        <View className="flex-row items-center gap-2 relative">
          {renderIcon()}
          <TextLg>{server.name}</TextLg>
        </View>
        <TextMd>{server.description}</TextMd>
        <View className="flex-row justify-between">
          <UserCount serverUsers={server.joinedUsers ?? []} />
          <JoinServer server={server} />
        </View>
      </View>
    </View>
  );
};
