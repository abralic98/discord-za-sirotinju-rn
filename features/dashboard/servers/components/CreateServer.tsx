import {
  CreateServerDocument,
  CreateServerInput,
  CreateServerMutation,
  CreateServerMutationVariables,
} from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { createServerSchema } from "./zod";
import { showSuccess } from "@/helpers/Toast";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { useRoomStore } from "../../rooms/store";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { FormInputBottomSheet } from "@/components/input/FormInputBottomSheet";
import { FormSwitch } from "@/components/form/FormSwitch";
import { TextLg, TextMd } from "@/lib/typography";
import { Pressable, View } from "react-native";
import { CustomBottomSheet } from "@/components/CustomBottomSheet";
import { PlusIcon } from "lucide-nativewind";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

export const CreateServer = () => {
  const form = useForm<CreateServerInput>({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      publicServer: false,
    },
  });
  const { setActiveServer } = useRoomStore();
  const {dismissAll} = useBottomSheetModal()

  const createServerMutation = useMutation({
    mutationFn: async (data: CreateServerInput) => {
      const modifiedData: CreateServerMutationVariables = {
        server: data,
      };
      const res = await requestWithAuth<CreateServerMutation>(
        CreateServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: (data) => {
      showSuccess({ title: "Server Created!" });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getAllUserServers],
      });
      setActiveServer(data.createServer);
      dismissAll()
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const onSubmit = async (data: CreateServerInput) => {
    createServerMutation.mutateAsync(data);
  };

  return (
    <CustomBottomSheet
      trigger={(open) => (
        <Pressable
          className="w-20 h-20 bg-dark-server rounded-full flex items-center justify-center"
          onPress={open}
        >
          <PlusIcon className="text-white" />
        </Pressable>
      )}
      actionButtons={{
        confirm: {
          action: form.handleSubmit(onSubmit),
          text: "Create Server",
        },
      }}
    >
      <FormProvider {...form}>
        <View className="gap-4 py-2">
          <TextLg>Create new server</TextLg>
          <FormInputBottomSheet<CreateServerInput>
            label="Server name"
            name="name"
          />
          <FormSwitch<CreateServerInput>
            label="Public Server"
            name="publicServer"
          />
          {form.watch("publicServer") === true && (
            <TextMd className="font-semibold">Server will appear on discovery page</TextMd>
          )}
        </View>
      </FormProvider>
    </CustomBottomSheet>
  );
};
