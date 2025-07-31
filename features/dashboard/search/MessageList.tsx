import {
  GetMessagesByRoomIdDocument,
  GetMessagesByRoomIdQuery,
  Message,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { usePagination } from "@/hooks/usePagination";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { useRoomStore } from "../rooms/store";
import { SingleMessage } from "../messages/SingleMessage";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import { TextMd } from "@/lib/typography";

export const MessageList = () => {
  const { activeRoom } = useRoomStore();
  //todo
  const form = useFormContext();
  const search = form.watch("search");
  const filter = form.watch("filter");

  const query = usePagination<GetMessagesByRoomIdQuery, "getMessagesByRoomId">({
    queryKey: [queryKeys.getSearchedMessagesByRoomId, activeRoom?.id],
    document: GetMessagesByRoomIdDocument,
    dataField: "getMessagesByRoomId",
    pageSize: 20,
    enabled: Boolean(filter === "message"),
    variables: {
      id: activeRoom?.id,
    },
    search: search,
  });

  const allMessages =
    query.data?.pages.flatMap((page) => page.getMessagesByRoomId.content) ?? [];

  if (query.error) {
    handleGraphqlError(query.error);
  }

  useDebounce(
    () => {
      if (filter === "message") query.refetch();
    },
    300,
    [search],
  );

  if (filter !== "message") return <TextMd>TODO</TextMd>;

  return (
    <View className="w-full h-full px-4 py-2">
      <FlashList
        data={allMessages}
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
        contentContainerStyle={{ paddingBottom: 360 }}
      />
    </View>
  );
};
