import React from "react";
import { View } from "react-native";
import { BasicInfo } from "./BasicInfo";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { useRoomStore } from "../store";
import { GetServerByIdDocument, GetServerByIdQuery } from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { TextLg } from "@/lib/typography";
import { EditServerIcon } from "./EditServerIcon";
import { EditServerBanner } from "./EditServerBanner";
import { UserList } from "./users-settings/UserList";
import { BannedUserList } from "./users-settings/BannedUserList";
import { ServerAdministration } from "./administration/ServerAdministration";

export const ServerSettings = () => {
  const { activeServer } = useRoomStore();

  const { data, error } = useQuery({
    queryKey: [queryKeys.getServerById, activeServer?.id],
    enabled: Boolean(activeServer?.id),
    queryFn: async (): Promise<GetServerByIdQuery> => {
      return await requestWithAuth<GetServerByIdQuery>(GetServerByIdDocument, {
        id: activeServer?.id,
      });
    },
    select: (data) => data.getServerById,
  });

  if (error) {
    handleGraphqlError(error);
  }

  if (!data) return <TextLg>Something went wrong</TextLg>;
  return (
    <View className="gap-4">
      <BasicInfo server={data} />
      <EditServerIcon server={data} />
      <EditServerBanner server={data} />
      <UserList server={data} />
      <BannedUserList server={data} />
      <ServerAdministration server={data}/>
    </View>
  );
};
