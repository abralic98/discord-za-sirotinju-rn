import {
  GetDirectMessagesByInboxIdDocument,
  GetDirectMessagesByInboxIdQuery,
  Message,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { usePagination } from "@/hooks/usePagination";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { useInboxStore } from "../store";
import { SingleMessage } from "@/features/dashboard/messages/SingleMessage";
import { useMemo, useState } from "react";
import { useDirectMessageConnection } from "../hooks/useDirectMessageConnection";

export const DirectMessageList = () => {
  const { activeInbox } = useInboxStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const query = usePagination<
    GetDirectMessagesByInboxIdQuery,
    "getDirectMessagesByInboxId"
  >({
    queryKey: [queryKeys.getDirectMessagesByInboxId, activeInbox?.id],
    document: GetDirectMessagesByInboxIdDocument,
    dataField: "getDirectMessagesByInboxId",
    pageSize: 20,
    variables: {
      id: activeInbox?.id,
    },
  });

  useDirectMessageConnection((newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });

  const allMessages =
    query.data?.pages.flatMap(
      (page) => page.getDirectMessagesByInboxId.content,
    ) ?? [];

  const combinedMessages = useMemo(() => {
    const reversedMessages = [...messages].reverse();
    return [...reversedMessages, ...allMessages];
  }, [messages, allMessages]);

  if (query.error) {
    handleGraphqlError(query.error);
  }

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
