import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ID } from "react-native-appwrite";
import { storageClient } from "@/lib/appwrite/client";
import { ImagePickerAsset } from "expo-image-picker";

interface UseCloudStorageProps {
  file: ImagePickerAsset | null;
  setProgress?: Dispatch<SetStateAction<number>>;
}

interface UploadResult {
  isLoading: boolean;
  error: Error | null;
  uploadedImage: string | undefined;
}

export const useCloudStorage = ({
  file,
  setProgress,
}: UseCloudStorageProps): UploadResult => {
  const bucketId = "6822fe5600188749a318";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string>();

  useEffect(() => {
    const upload = async () => {
      if (!file) return;

      setIsLoading(true);
      setError(null);

      try {
        const fileObject = {
          uri: file.uri,
          name: file.fileName ?? "upload.jpg",
          type: file.type ?? "image/jpeg",
          size: file.fileSize ?? 0,
        };

        const response = await storageClient.createFile(
          bucketId,
          ID.unique(),
          fileObject,
          [],
          (prog: { progress: number }) => {
            setProgress && setProgress(prog.progress / 100);
          },
        );

        if (response.$id) {
          const fileUrl = storageClient.getFileViewURL(bucketId, response.$id); // ✅
          setUploadedImage(String(fileUrl));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    upload();
  }, [file]);

  return { isLoading, error, uploadedImage };
};
