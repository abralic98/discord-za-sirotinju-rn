import { queryKeys } from "@/lib/react-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";
import { useRoomStore } from "../rooms/store";
import {
  GetServerUsersDocument,
  GetServerUsersQuery,
} from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { FlashList } from "@shopify/flash-list";
import { SingleUser } from "./SingleUser";

export const UserList = () => {
  const { activeServer } = useRoomStore();

  const { data, error } = useQuery({
    queryKey: [queryKeys.getServerUsers, activeServer?.id],
    enabled: Boolean(activeServer?.id),
    queryFn: async (): Promise<GetServerUsersQuery> => {
      return await requestWithAuth<GetServerUsersQuery>(
        GetServerUsersDocument,
        {
          id: activeServer?.id,
        },
      );
    },
    select: (data) => data.getServerById,
  });

  if (error) {
    handleGraphqlError(error);
  }

  return (
    <View className="w-full h-full">
      <FlashList
        data={data?.joinedUsers}
        estimatedItemSize={60}
        keyExtractor={(item) => String(item?.id)}
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item }) => (
          <SingleUser serverOwnerId={data?.createdBy?.id} user={item} />
        )}
      />
    </View>
  );
};
