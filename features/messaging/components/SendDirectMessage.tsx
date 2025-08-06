import {
  CreateDirectMessageDocument,
  CreateDirectMessageMutation,
  CreateDirectMessageMutationVariables,
  CreateDmInput,
  MessageType,
} from "@/generated/graphql";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { useCloudStorage } from "@/hooks/useCloudStorage";
import { FormChatInput } from "@/components/form/FormChatInput";
import { ActivityIndicator, View } from "react-native";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import * as ImagePicker from "expo-image-picker";
import { ImageIcon, SendIcon } from "lucide-nativewind";
import { useInboxStore } from "../store";

export const SendDirectMessage = () => {
  const { activeInbox } = useInboxStore();
  const [image, setImage] = useState<string | null>(null);

  const form = useForm<CreateDmInput>({
    defaultValues: {
      inboxId: String(activeInbox?.id),
      type: MessageType.Text,
    },
  });

  const createMessageMutation = useMutation({
    mutationFn: async (data: CreateDmInput) => {
      const modifiedData: CreateDirectMessageMutationVariables = {
        message: data,
      };
      const res = await requestWithAuth<CreateDirectMessageMutation>(
        CreateDirectMessageDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      form.reset();
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const onSubmit = async (data: CreateDmInput) => {
    createMessageMutation.mutateAsync(data);
  };
  const [imageAsset, setImageAsset] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const { isLoading, uploadedImage } = useCloudStorage({ file: imageAsset });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageAsset(result.assets[0]);
    }
  };

  useEffect(() => {
    if (uploadedImage)
      createMessageMutation.mutateAsync({
        type: MessageType.Attachment,
        inboxId: String(activeInbox?.id),
        imageUrl: uploadedImage,
        text: "",
      });
  }, [uploadedImage]);

  return (
    <FormProvider {...form}>
      {activeInbox && (
        <View className="w-full">
          {isLoading && <ActivityIndicator className="p-4" />}
          <FormChatInput<CreateDmInput>
            name="text"
            placeholder={"Start typing..."}
            inputClassName="h-14"
            icon={
              <View className="flex-row gap-4">
                <ImageIcon
                  className="w-8 h-8 text-slate-400"
                  onPress={pickImage}
                />
                <SendIcon
                  onPress={form.handleSubmit(onSubmit)}
                  className="w-8 h-8 text-white"
                />
              </View>
            }
          />
        </View>
      )}
    </FormProvider>
  );
};
