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
import { CreateRoom } from "./CreateRoom";

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

  return (
    <View className="flex-1 h-full px-4 pt-4 bg-dark-server flex flex-col gap-4 rounded-tl-3xl">
      <View className="flex-row justify-between w-full ">
        <TextXl3
          ellipsizeMode="tail"
          numberOfLines={2}
          className="font-bold w-[60%]"
        >
          {activeServer.name}
        </TextXl3>
        <CreateRoom />
      </View>
      <ScrollView>
        {Boolean(data?.text?.length) && <TextLg>Text channels</TextLg>}
        <View className="h-4" />
        <View className="flex flex-col gap-4 pb-4">
          {data?.text?.map((room) => {
            return <SingleRoom key={room?.id} room={room} />;
          })}
        </View>
        {Boolean(data?.voice?.length) && <TextLg>Voice channels</TextLg>}
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
