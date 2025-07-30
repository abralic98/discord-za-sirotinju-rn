import { DefaultCard } from "@/components/custom/DefaultCard";
import * as ImagePicker from "expo-image-picker";
import { useCloudStorage } from "@/hooks/useCloudStorage";
import { ProgressBar } from "@/components/custom/ProgressBar";
import {
  Server,
  UpdateServerDocument,
  UpdateServerMutation,
  UpdateServerMutationVariables,
} from "@/generated/graphql";
import { TextLg, TextXl3 } from "@/lib/typography";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { useEffect, useState } from "react";
import { requestWithAuth } from "@/lib/graphql/client";
import { useMutation } from "@tanstack/react-query";
import { UploadIcon } from "lucide-nativewind";
import { ConfirmationButtons } from "@/components/custom/ConfirmationButtons";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { showSuccess } from "@/helpers/Toast";
import { queryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { useRoomStore } from "../store";

export const EditServerIcon = ({ server }: { server?: Server | null }) => {
  const { setActiveServer, activeServer } = useRoomStore();

  const [imageAsset, setImageAsset] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [progress, setProgress] = useState(0);

  const { isLoading, uploadedImage } = useCloudStorage({
    file: imageAsset,
    setProgress: setProgress,
  });

  const renderIcon = () => {
    if (server?.serverImg) {
      return (
        <Image
          alt="server icon"
          source={{ uri: server?.serverImg }}
          style={{ width: 124, height: 124, borderRadius: 99 }}
          contentFit="cover"
        />
      );
    } else {
      return (
        <View className="w-36 h-36 rounded-full bg-dark-active-server items-center justify-center">
          <TextXl3 className="font-semibold">
            {server?.name?.slice(0, 2)}
          </TextXl3>
        </View>
      );
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const updateServerMutation = useMutation({
    mutationFn: async (url: string) => {
      if (!server?.id) return;
      const modifiedData: UpdateServerMutationVariables = {
        server: {
          id: server.id,
          serverImg: url,
        },
      };
      const res = await requestWithAuth<UpdateServerMutation>(
        UpdateServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: (res) => {
      showSuccess({ title: "Icon updated!" });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getServerById, server?.id],
      });
      queryClient.refetchQueries({
        queryKey: [queryKeys.getAllUserServers],
      });
      setActiveServer({
        ...activeServer,
        serverImg: res?.updateServer?.serverImg,
      });
      setImage(null);
      setImageAsset(null);
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  useEffect(() => {
    if (!uploadedImage) return;
    updateServerMutation.mutateAsync(uploadedImage);
  }, [uploadedImage]);

  return (
    <DefaultCard>
      <TextLg>Server icon</TextLg>
      <View className="w-full items-center gap-4">
        <View className="flex-row w-full justify-between items-center">
          {renderIcon()}

          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 124, height: 124, borderRadius: 99 }}
              resizeMode="cover"
            />
          ) : (
            <Pressable
              onPress={pickImage}
              className="bg-dark-input w-36 h-36 rounded-full justify-center items-center"
            >
              <UploadIcon className="w-10 h-10 text-white" />
            </Pressable>
          )}
        </View>
        {image && (
          <ConfirmationButtons
            cancel={() => setImage(null)}
            submit={() => setImageAsset(image)}
            submitText="Upload"
          />
        )}
        {isLoading && <ProgressBar progress={progress} />}
      </View>
    </DefaultCard>
  );
};
