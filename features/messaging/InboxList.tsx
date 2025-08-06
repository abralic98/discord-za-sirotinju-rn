import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { TextLg, TextMd } from "@/lib/typography";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";
import { SingleInbox } from "./components/SingleInbox";
import { GetMyInboxDocument, GetMyInboxQuery } from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";

export const InboxList = () => {
  const { data, error } = useQuery<GetMyInboxQuery>({
    queryKey: [queryKeys.getMyInbox],
    gcTime: 0,
    queryFn: async (): Promise<GetMyInboxQuery> => {
      return await requestWithAuth(GetMyInboxDocument);
    },
  });

  if (error) {
    handleGraphqlError(error);
  }

  const renderInboxes = () => {
    return data?.getMyInbox?.map((inbox) => {
      return <SingleInbox key={inbox?.id} inbox={inbox} />;
    });
  };

  return (
    <View className="flex flex-col gap-4 h-full border border-sidebar-border p-2 pt-7">
      {/* <CreateNewDM /> */}
      <TextLg>Direct messages</TextLg>
      {renderInboxes()}
    </View>
  );
};
