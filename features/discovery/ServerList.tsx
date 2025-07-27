import { GetAllServersDocument, GetAllServersQuery } from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { usePagination } from "@/hooks/usePagination";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { SingleServer } from "./components/SingleServer";
import { View } from "react-native";

export const ServerList = () => {
  const query = usePagination<GetAllServersQuery, "getAllServers">({
    queryKey: [queryKeys.getAllServers],
    document: GetAllServersDocument,
    dataField: "getAllServers",
    pageSize: 5,
    // gcTime: 0,
  });
  console.log(query.data?.pages[0]);

  if (query.error) {
    handleGraphqlError(query.error);
  }

  const allServers =
    query.data?.pages.flatMap((page) => page.getAllServers.content) || [];

  return (
    <View className="w-full h-full">
      <FlashList
        data={allServers}
        estimatedItemSize={60}
        keyExtractor={(item) => String(item?.id)}
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item }) => <SingleServer server={item} />}
        onTouchEnd={() => {
          if (query.hasNextPage && !query.isFetchingNextPage) {
            query.fetchNextPage();
          }
        }}
      />
    </View>
  );
};
