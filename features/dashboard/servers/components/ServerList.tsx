import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import {
  GetAllUserServersDocument,
  GetAllUserServersQuery,
  Server,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { SingleServer } from "../SingleServer";
import { CreateServer } from "./CreateServer";

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

  const createServer: Server = {
    id: "creation",
  };
  const mergedData = [createServer, ...(data ?? [])];

  return (
    <FlashList
      data={mergedData || []}
      estimatedItemSize={60}
      keyExtractor={(item) => String(item?.id)}
      ItemSeparatorComponent={() => <View className="h-4" />}
      renderItem={({ item }) => {
        if (item?.id === "creation") {
          return <CreateServer />;
        }
        return <SingleServer server={item} />;
      }}
    />
  );
};
