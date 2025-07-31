import { Button } from "@/components/ui/Button";
import {
  DeleteServerDocument,
  DeleteServerMutation,
  DeleteServerMutationVariables,
  Server,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { showSuccess } from "@/helpers/Toast";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/lib/react-query/queryKeys";
import routes from "@/lib/routes";
import { TextMd } from "@/lib/typography";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";
import { useRoomStore } from "../../../store";

export const DeleteServer = ({ server }: { server: Server | null }) => {
  const { replace } = useRouter();
  const { setActiveServer } = useRoomStore();
  const deleteServerMutation = useMutation({
    mutationFn: async () => {
      if (!server?.id) return;
      const modifiedData: DeleteServerMutationVariables = {
        serverId: server.id,
      };
      const res = await requestWithAuth<DeleteServerMutation>(
        DeleteServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      setActiveServer(null);
      showSuccess({ title: "Server Deleted!" });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getAllUserServers],
      });
      replace(routes.dashboard);
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const deleteServer = () => {
    Alert.alert(
      `Delete ${server?.name}`,
      "Are you sure you want to delete this server? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          style: "destructive",
          onPress: () => {
            deleteServerMutation.mutate();
          },
        },
      ],
      { cancelable: true },
    );
  };
  return (
    <Button
      className="w-[40%]"
      loading={deleteServerMutation.isPending}
      variant={"destructive"}
      onPress={deleteServer}
    >
      <TextMd className="font-semibold">Delete Server</TextMd>
    </Button>
  );
};
