import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import {
  GetAllUserServersDocument,
  GetAllUserServersQuery,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { SingleServer } from "../SingleServer";

export const ServerList = () => {
  const { data, error } = useQuery({
    queryKey: [queryKeys.getAllUserServers],
    queryFn: async (): Promise<GetAllUserServersQuery> => {
      return await requestWithAuth<GetAllUserServersQuery>(
        GetAllUserServersDocument,
      );
    },
    select: (data) => data.getAllUserServers,
  });

  if (error) {
    handleGraphqlError(error);
  }

  return (
    <FlashList
      data={data || []}
      estimatedItemSize={60}
      keyExtractor={(item) => String(item?.id)}
      ItemSeparatorComponent={() => <View className="h-4" />}
      renderItem={({ item }) => <SingleServer server={item} />}
    />
  );
};
