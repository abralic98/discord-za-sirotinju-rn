import React from "react";
import { ScrollView, View } from "react-native";
import { useRoomStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import {
  GetRoomsByServerIdDocument,
  GetRoomsByServerIdQuery,
} from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { TextLg, TextMd, TextXl3 } from "@/lib/typography";
import { SingleRoom } from "./SingleRoom";
import { SingleVoiceRoom } from "./SingleVoiceRoom";

export const RoomList = () => {
  const { activeServer } = useRoomStore();

  const { data, error } = useQuery({
    queryKey: [queryKeys.getRoomsByServerId, activeServer?.id],
    enabled: Boolean(activeServer?.id),
    queryFn: async (): Promise<GetRoomsByServerIdQuery> => {
      return await requestWithAuth<GetRoomsByServerIdQuery>(
        GetRoomsByServerIdDocument,
        {
          id: activeServer?.id,
        },
      );
    },
    select: (data) => data.getRoomsByServerId,
  });

  if (error) {
    handleGraphqlError(error);
  }

  if (!activeServer?.id)
    return (
      <View>
        <TextMd>non</TextMd>
      </View>
    );

  if (!Boolean(data?.text?.length) && !Boolean(data?.text?.length)) {
    return (
      <View className="w-full pl-3 pt-3 bg-dark-server">
        <TextLg>No rooms</TextLg>
      </View>
    );
  }

  return (
    <View className="flex-1 h-full px-3 pt-3 bg-dark-server flex flex-col gap-4">
      <TextXl3 className="font-bold">{activeServer.name}</TextXl3>
      <ScrollView>
        <TextLg>Text channels</TextLg>
        <View className="h-4" />
        <View className="flex flex-col gap-4 pb-4">
          {data?.text?.map((room) => {
            return <SingleRoom key={room?.id} room={room} />;
          })}
        </View>
        <TextLg>Voice channels</TextLg>
        <View className="h-4" />
        <View className="flex flex-col gap-4">
          {data?.voice?.map((room) => {
            return <SingleVoiceRoom key={room?.id} room={room} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};
