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
import { ServerIcon } from "lucide-nativewind";
import { ConfirmationButtons } from "@/components/custom/ConfirmationButtons";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { showSuccess } from "@/helpers/Toast";
import { queryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { useRoomStore } from "../store";

export const EditServerBanner = ({ server }: { server?: Server | null }) => {
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
    if (server?.banner) {
      return (
        <Pressable className="w-full" onPress={pickImage}>
          <Image
            alt="server banner"
            source={{ uri: server?.banner }}
            style={{ width: "100%", height: 160, borderRadius: 12 }}
            contentFit="cover"
          />
        </Pressable>
      );
    } else {
      return (
        <Pressable
          onPress={pickImage}
          className="bg-dark-input w-full h-40 rounded-xl justify-center items-center"
        >
          <ServerIcon className="w-10 h-10 text-white" />
        </Pressable>
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
          banner: url,
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
        banner: res?.updateServer?.banner,
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
      <TextLg>Server Banner</TextLg>
      <View className="w-full items-center gap-4">
        <View className="flex-row w-full justify-between items-center">
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={{ width: "100%", height: 160, borderRadius: 12 }}
              resizeMode="cover"
            />
          ) : (
            renderIcon()
          )}
        </View>
        {image && (
          <ConfirmationButtons
            cancel={() => setImage(null)}
            submit={() => setImageAsset(image)}
            submitText="Upload"
            loading={isLoading}
          />
        )}
        {isLoading && <ProgressBar progress={progress} />}
      </View>
    </DefaultCard>
  );
};
