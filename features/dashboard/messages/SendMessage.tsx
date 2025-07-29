import {
  CreateMessageDocument,
  CreateMessageInput,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  MessageType,
} from "@/generated/graphql";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { useCloudStorage } from "@/hooks/useCloudStorage";
import { useRoomStore } from "../rooms/store";
import { FormChatInput } from "@/components/form/FormChatInput";
import { ActivityIndicator, View } from "react-native";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import * as ImagePicker from "expo-image-picker";
import { ImageIcon, SendIcon } from "lucide-nativewind";

export const SendMessage = () => {
  const { activeRoom } = useRoomStore();
  const [image, setImage] = useState<string | null>(null);

  const form = useForm<CreateMessageInput>({
    defaultValues: {
      roomId: activeRoom?.id,
      type: MessageType.Text,
    },
  });
  const placeholder = activeRoom?.name
    ? `Message # ${activeRoom.name}`
    : "Start typing";

  const createMessageMutation = useMutation({
    mutationFn: async (data: CreateMessageInput) => {
      const modifiedData: CreateMessageMutationVariables = {
        message: data,
      };
      const res = await requestWithAuth<CreateMessageMutation>(
        CreateMessageDocument,
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

  const onSubmit = async (data: CreateMessageInput) => {
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
      quality: 1,
    });

    if (!result.canceled) {
      setImageAsset(result.assets[0]);
    }
  };

  useEffect(() => {
    if (uploadedImage)
      createMessageMutation.mutateAsync({
        type: MessageType.Attachment,
        roomId: String(activeRoom?.id),
        imageUrl: uploadedImage,
        text: "",
      });
  }, [uploadedImage]);

  return (
    <FormProvider {...form}>
      {activeRoom && (
        <View className="w-full">
          {isLoading && <ActivityIndicator className="p-4" />}
          <FormChatInput<CreateMessageInput>
            name="text"
            placeholder={placeholder}
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
