import { GetAllServersDocument, GetAllServersQuery } from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { usePagination } from "@/hooks/usePagination";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import { SingleServer } from "./components/SingleServer";
import { View } from "react-native";
import { useFormContext } from "react-hook-form";
import { SearchBar } from "react-native-screens";
import { useDebounce } from "@/hooks/useDebounce";

export const ServerList = () => {
  const { watch } = useFormContext();
  const search = watch("search");
  const query = usePagination<GetAllServersQuery, "getAllServers">({
    queryKey: [queryKeys.getAllServers],
    document: GetAllServersDocument,
    dataField: "getAllServers",
    pageSize: 5,
    search: search,
  });

  if (query.error) {
    handleGraphqlError(query.error);
  }

  useDebounce(
    () => {
      query.refetch();
    },
    200,
    [search],
  );

  const allServers =
    query.data?.pages.flatMap((page) => page.getAllServers.content) || [];

  return (
    <View className="w-full h-full">
      <SearchBar />
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
        contentContainerStyle={{ paddingBottom: 260 }}
      />
    </View>
  );
};
