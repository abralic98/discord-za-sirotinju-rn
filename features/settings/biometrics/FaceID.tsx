import { Button } from "@/components/ui/Button";
import { showSuccess } from "@/helpers/Toast";
import { getFromStorage, saveToStorage } from "@/lib/secure-storage/storage";
import { StorageKeys } from "@/lib/secure-storage/storageKeys";
import { TextMd } from "@/lib/typography";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export const FaceID = () => {
  const [isActive, setIsActive] = useState<boolean | null>(null);

  useEffect(() => {
    const loadBiometricSetting = async () => {
      const storedValue = await getFromStorage(StorageKeys.ISBIOMETRICACTIVE);
      setIsActive(storedValue === "true");
    };
    loadBiometricSetting();
  }, []);

  const toggleBiometric = async () => {
    const newValue = !isActive;
    await saveToStorage(
      StorageKeys.ISBIOMETRICACTIVE,
      newValue ? "true" : "false",
    );
    showSuccess({
      title: `${newValue ? "FaceID activated!" : "FaceID deactivated!"}`,
    });
    setIsActive(newValue);
  };

  if (isActive === null) {
    return <TextMd>Loading...</TextMd>;
  }

  return (
    <View className="w-full">
      <Button
        onPress={toggleBiometric}
        variant={isActive ? "destructive" : "default"}
      >
        <TextMd className="font-semibold">
          {isActive ? "Deactivate FaceID" : "Activate FaceID"}
        </TextMd>
      </Button>
    </View>
  );
};
