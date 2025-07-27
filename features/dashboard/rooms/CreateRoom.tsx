import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateRoomDocument,
  CreateRoomInput,
  CreateRoomMutation,
  CreateRoomMutationVariables,
  RoomType,
} from "@/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { useRoomStore } from "./store";
import { useRouter } from "expo-router";
import { showSuccess } from "@/helpers/Toast";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { StyleSheet, View } from "react-native";
import { FormInput } from "@/components/input/FormInput";
import { Button } from "@/components/ui/Button";
import { createRoomSchema } from "./zod";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { TextMd } from "@/lib/typography";
import { CustomBottomSheet } from "@/components/CustomBottomSheet";
import { FormSwitch } from "@/components/form/FormSwitch";

export const CreateRoom = () => {
  const { activeServer } = useRoomStore();
  const { push } = useRouter();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["60%"];
  const form = useForm({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      serverId: String(activeServer?.id),
    },
  });

  const createRoomMutation = useMutation({
    mutationFn: async (data: CreateRoomMutationVariables) => {
      const res = await requestWithAuth<CreateRoomMutation>(
        CreateRoomDocument,
        data,
      );
      return res;
    },
    onSuccess: () => {
      showSuccess({ title: "Room Created" });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getRoomsByServerId, activeServer?.id],
      });
      form.reset()
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const onSubmit = async (data: { name: string }) => {
    if (!activeServer?.id) return;
    const type = form.getValues("type");
    const modifiedData: CreateRoomMutationVariables = {
      room: {
        ...data,
        serverId: activeServer?.id,
        type: type ? RoomType.Voice : RoomType.Text,
      },
    };
    createRoomMutation.mutateAsync(modifiedData);
  };

  return (
    <CustomBottomSheet
      trigger={(open) => (
        <Button onPress={open}>
          <TextMd>Create room</TextMd>
        </Button>
      )}
      actionButtons={{
        confirm: form.handleSubmit(onSubmit),
      }}
    >
      <FormProvider {...form}>
        <View className="flex flex-col w-full  gap-3">
          <FormInput<CreateRoomInput> label="Room Name" name="name" />
          <FormSwitch<CreateRoomInput> name="type" label="Voice room" />
        </View>
      </FormProvider>
    </CustomBottomSheet>
  );
};
