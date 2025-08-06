import { DefaultCard } from "@/components/custom/DefaultCard";
import { FormInput } from "@/components/input/FormInput";
import { Button } from "@/components/ui/Button";
import {
  Server,
  UpdateServerDocument,
  UpdateServerInput,
  UpdateServerMutation,
  UpdateServerMutationVariables,
} from "@/generated/graphql";
import { TextLg, TextMd } from "@/lib/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { updateServerSchema } from "./zod";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { showSuccess } from "@/helpers/Toast";
import { queryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { useRoomStore } from "../store";
import { FormTextArea } from "@/components/input/FormTextArea";
import { ConfirmationButtons } from "@/components/custom/ConfirmationButtons";

interface ModifiedServerInput {
  name: string;
  description?: string;
}

export const BasicInfo = ({ server }: { server?: Server | null }) => {
  const { setActiveServer, activeServer } = useRoomStore();
  const form = useForm<ModifiedServerInput>({
    resolver: zodResolver(updateServerSchema),
    defaultValues: {
      name: server?.name ?? "",
      description: server?.description ?? "",
    },
  });

  const updateServer = useMutation({
    mutationFn: async (data: UpdateServerInput) => {
      if (!server?.id) return;
      const modifiedData: UpdateServerMutationVariables = {
        server: {
          ...data,
          id: server?.id,
        },
      };
      const res = await requestWithAuth<UpdateServerMutation>(
        UpdateServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: (res) => {
      showSuccess({ title: "Server updated!" });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getServerById, server?.id],
      });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getAllUserServers],
      });
      setActiveServer({
        ...activeServer,
        name: res?.updateServer?.name,
        description: res?.updateServer?.description,
      });
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const submit = (data: ModifiedServerInput) => {
    updateServer.mutateAsync(data as UpdateServerInput);
  };

  return (
    <DefaultCard>
      <TextLg>Basic info</TextLg>
      <FormProvider<ModifiedServerInput> {...form}>
        <FormInput name="name" label="Server name" />
        <FormTextArea name="description" label="Server description" />
        <ConfirmationButtons
          loading={updateServer.isPending}
          cancel={() => form.reset()}
          submit={form.handleSubmit(submit)}
        />
      </FormProvider>
    </DefaultCard>
  );
};
