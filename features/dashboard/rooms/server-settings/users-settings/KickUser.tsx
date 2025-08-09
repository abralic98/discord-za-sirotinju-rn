import { Button } from "@/components/ui/Button";
import {
  KickUserFromServerDocument,
  KickUserFromServerMutation,
  KickUserFromServerMutationVariables,
  KickUserInput,
  User,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { showSuccess } from "@/helpers/Toast";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { TextMd } from "@/lib/typography";
import React from "react";
import { View } from "react-native";
import { useRoomStore } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

export const KickUser = ({ user }: { user?: User | null }) => {
  const { activeServer } = useRoomStore();
  const { dismissAll } = useBottomSheetModal();

  const kickUserMutation = useMutation({
    mutationFn: async (data: KickUserInput) => {
      const modifiedData: KickUserFromServerMutationVariables = {
        input: data,
      };
      const res = await requestWithAuth<KickUserFromServerMutation>(
        KickUserFromServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      showSuccess({ title: "User Kicked" });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getServerById, activeServer?.id],
      });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getAllUserServers],
      });
      dismissAll();
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const handleKick = () => {
    if (!activeServer?.id) return;
    if (!user?.id) return;
    kickUserMutation.mutateAsync({
      userId: user?.id,
      serverId: activeServer.id,
    });
  };

  return (
    <View className="gap-4">
      <View>
        <TextMd className="font-semibold">
          Kick {user?.username} from server
        </TextMd>
        <TextMd className="font-semibold">
          User will be able to join back
        </TextMd>
      </View>
      <Button
        loading={kickUserMutation.isPending}
        onPress={handleKick}
        variant={"destructive"}
        className="min-w-40"
      >
        <TextMd className="font-semibold">Kick {user?.username}</TextMd>
      </Button>
    </View>
  );
};
