import {
  GetMessagesByRoomIdDocument,
  GetMessagesByRoomIdQuery,
  Message,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { usePagination } from "@/hooks/usePagination";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { SingleMessage } from "./SingleMessage";
import { useRoomStore } from "../rooms/store";
import { useRoomConnection } from "./hooks/useRoomConnection";

export const MessageList = () => {
  const { activeRoom } = useRoomStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const firstScrollDone = useRef(false);

  const query = usePagination<GetMessagesByRoomIdQuery, "getMessagesByRoomId">({
    queryKey: [queryKeys.getMessagesByRoomId, activeRoom?.id],
    document: GetMessagesByRoomIdDocument,
    dataField: "getMessagesByRoomId",
    pageSize: 20,
    variables: {
      id: activeRoom?.id,
    },
  });
  console.log(messages);

  useRoomConnection((newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });

  const allMessages =
    query.data?.pages.flatMap((page) => page.getMessagesByRoomId.content) ?? [];

  const combinedMessages = useMemo(() => {
    // Reverse a copy of messages so original is not mutated
    const reversedMessages = [...messages].reverse();
    return [...reversedMessages, ...allMessages];
  }, [messages, allMessages]);

  if (query.error) {
    handleGraphqlError(query.error);
  }

  return (
    <View className="flex-1 w-full px-4 py-2">
      <FlashList
        data={combinedMessages}
        estimatedItemSize={60}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SingleMessage key={item?.id} message={item} />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (query.hasNextPage && !query.isFetchingNextPage) {
            query.fetchNextPage();
          }
        }}
        inverted
        ListHeaderComponent={
          query.hasNextPage ? <View className="h-6" /> : null
        }
      />
    </View>
  );
};
