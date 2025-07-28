import {
  GetMessagesByRoomIdDocument,
  GetMessagesByRoomIdQuery,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { usePagination } from "@/hooks/usePagination";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { FlashList } from "@shopify/flash-list";
import React, { useRef } from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import { SingleMessage } from "./SingleMessage";
import { useRoomStore } from "../rooms/store";

export const MessageList = () => {
  const { activeRoom } = useRoomStore();
  const listRef = useRef(null);
  const query = usePagination<GetMessagesByRoomIdQuery, "getMessagesByRoomId">({
    queryKey: [queryKeys.getMessagesByRoomId, activeRoom?.id],
    document: GetMessagesByRoomIdDocument,
    dataField: "getMessagesByRoomId",
    pageSize: 20,
    variables: {
      id: activeRoom?.id,
    },
  });

  if (query.error) {
    handleGraphqlError(query.error);
  }

  const allMessages =
    query.data?.pages.flatMap((page) => page.getMessagesByRoomId.content) || [];

  const screenHeight = Dimensions.get("window").height;
  const adjustedHeight = screenHeight - 260;
  return (
    <View className="w-full px-4 py-2" style={{ height: adjustedHeight }}>
      <FlashList
        ref={listRef}
        data={allMessages}
        estimatedItemSize={60}
        keyExtractor={(item) => String(item?.id)}
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item }) => <SingleMessage message={item} />}
        onEndReached={() => {
          if (query.hasNextPage && !query.isFetchingNextPage) {
            query.fetchNextPage();
          }
        }}
        inverted
        scrollEventThrottle={16}
      />
    </View>
  );
};
