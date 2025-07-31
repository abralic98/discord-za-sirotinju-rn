import { CustomBottomSheet } from "@/components/CustomBottomSheet";
import { Button } from "@/components/ui/Button";
import { TextMd } from "@/lib/typography";
import React, { useState } from "react";
import { View } from "react-native";
import {
  BannedUser,
  UnbanUserFromServerDocument,
  UnbanUserFromServerMutation,
  UnbanUserFromServerMutationVariables,
  UnbanUserInput,
} from "@/generated/graphql";
import { formatDate } from "@/helpers/Date";
import { ConfirmationButtons } from "@/components/custom/ConfirmationButtons";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useRoomStore } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { showSuccess } from "@/helpers/Toast";
import { queryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";

export const BanInfoModal = ({ user }: { user?: BannedUser | null }) => {
  const [value, setValue] = useState("kick");
  const { dismissAll } = useBottomSheetModal();

  const { activeServer } = useRoomStore();

  const unbanUserMutation = useMutation({
    mutationFn: async (data: UnbanUserInput) => {
      const modifiedData: UnbanUserFromServerMutationVariables = {
        input: data,
      };
      const res = await requestWithAuth<UnbanUserFromServerMutation>(
        UnbanUserFromServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      showSuccess({ title: "User Unbanned" });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getServerById, activeServer?.id],
      });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getBannedUsersByServerId, activeServer?.id],
      });
      dismissAll();
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const handleUnban = () => {
    if (!activeServer?.id) return;
    if (!user?.user.id) return;

    const data: UnbanUserInput = {
      serverId: activeServer.id,
      userId: user.user.id,
    };
    unbanUserMutation.mutateAsync(data);
  };

  return (
    <View>
      <CustomBottomSheet
        trigger={(open) => (
          <Button onPress={open}>
            <TextMd>More info</TextMd>
          </Button>
        )}
      >
        <View className="flex-1 justify-center px-2 gap-4">
          <TextMd className="font-semibold">
            Banned by: {user?.banAuthor.username}{" "}
          </TextMd>
          <TextMd className="font-semibold">
            Ban date: {formatDate(user?.dateCreated)}
          </TextMd>
          <TextMd className="font-semibold">Reason: {user?.reason}</TextMd>
          <ConfirmationButtons
            submitText={`Unban ${user?.user.username}`}
            submit={handleUnban}
            cancel={dismissAll}
          />
        </View>
      </CustomBottomSheet>
    </View>
  );
};
