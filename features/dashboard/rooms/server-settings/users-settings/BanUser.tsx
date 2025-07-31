import {
  BanUserFromServerDocument,
  BanUserFromServerMutation,
  BanUserFromServerMutationVariables,
  BanUserInput,
  User,
} from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { RefObject } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRoomStore } from "../../store";
import { banUserSchema } from "../zod";
import { showSuccess } from "@/helpers/Toast";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { View } from "react-native";
import { TextMd } from "@/lib/typography";
import { FormTextArea } from "@/components/input/FormTextArea";
import { ConfirmationButtons } from "@/components/custom/ConfirmationButtons";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

interface Props {
  user?: User | null;
}
type BanUserInputModified = Omit<BanUserInput, "serverId" | "userId">;

export const BanUser = ({ user }: Props) => {
  const { activeServer } = useRoomStore();
  const form = useForm<BanUserInputModified>({
    resolver: zodResolver(banUserSchema),
  });
  const { dismissAll } = useBottomSheetModal();
  const banUserMutation = useMutation({
    mutationFn: async (data: BanUserInputModified) => {
      const modifiedData: BanUserFromServerMutationVariables = {
        input: {
          ...data,
          serverId: String(activeServer?.id),
          userId: String(user?.id),
        },
      };
      const res = await requestWithAuth<BanUserFromServerMutation>(
        BanUserFromServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      showSuccess({ title: "User Banned" });
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

  const handleBan = (data: BanUserInputModified) => {
    if (!activeServer) return;
    if (!user?.id) return;
    banUserMutation.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <View className="flex flex-col gap-4">
        <View className="flex flex-col gap-2">
          <TextMd className="font-semibold">
            Ban {user?.username} from server
          </TextMd>
          <TextMd className="font-semibold">
            User will not be able to join back
          </TextMd>
        </View>
        <FormTextArea<BanUserInputModified> name="reason" label="Reason" />
        <ConfirmationButtons
          loading={banUserMutation.isPending}
          submit={form.handleSubmit(handleBan)}
          cancel={form.reset}
          submitText={`Ban ${user?.username}`}
        />
      </View>
    </FormProvider>
  );
};
