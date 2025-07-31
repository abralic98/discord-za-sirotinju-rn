import {
  GetBannedUsersByServerIdDocument,
  GetBannedUsersByServerIdQuery,
  Server,
  User,
} from "@/generated/graphql";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import { SingleUser } from "./SingleUser";
import { DefaultCard } from "@/components/custom/DefaultCard";
import { TextLg } from "@/lib/typography";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { requestWithAuth } from "@/lib/graphql/client";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { SingleBannedUser } from "./SingleBannedUser";

export const BannedUserList = ({ server }: { server?: Server | null }) => {
  //tailwind not workiing for some reason temporary

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys.getBannedUsersByServerId, server?.id],
    enabled: Boolean(server?.id),
    queryFn: async (): Promise<GetBannedUsersByServerIdQuery> => {
      return await requestWithAuth<GetBannedUsersByServerIdQuery>(
        GetBannedUsersByServerIdDocument,
        {
          id: server?.id,
        },
      );
    },
  });

  if (error) {
    handleGraphqlError(error);
  }

  const getHeight = () => {
    switch (data?.getBannedUsersByServerId?.length) {
      case 0:
        return 20;
      case 1:
        return 60;
      case 2:
        return 120;

      case 3:
        return 180;

      case 4:
        return 240;

      case 5:
        return 320;

      default:
        return 380;
    }
  };
  return (
    <DefaultCard>
      <TextLg>Banned users ({`${data?.getBannedUsersByServerId?.length}`})</TextLg>
      <View className="w-full" style={{ height: getHeight() }}>
        <FlashList
          data={data?.getBannedUsersByServerId}
          estimatedItemSize={60}
          keyExtractor={(item) => String(item?.user.id)}
          renderItem={({ item }) => <SingleBannedUser user={item} />}
        />
      </View>
    </DefaultCard>
  );
};
