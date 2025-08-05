import { TextLabel, TextMd } from "@/lib/typography";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { DefaultCard } from "@/components/custom/DefaultCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaceID } from "./FaceID";
import { FingerPrint } from "./Fingerprint";

export const Biometrics = () => {
  const [biometricTypes, setBiometricTypes] = useState<number[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [value, setValue] = useState("faceid");

  useEffect(() => {
    const checkBiometrics = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      console.log(supportedTypes);

      if (hasHardware && isEnrolled) {
        setIsAvailable(true);
        setBiometricTypes(supportedTypes);
        if (
          supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FINGERPRINT,
          )
        ) {
          setValue("fingerprint");
        } else if (
          supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
          )
        ) {
          setValue("faceid");
        }
      } else {
        setIsAvailable(false);
      }
    };

    checkBiometrics();
  }, []);

  if (!isAvailable) {
    return (
      <View>
        <TextMd className="font-semibold">
          Your device does not support this feature
        </TextMd>
      </View>
    );
  }

  return (
    <DefaultCard>
      <View className="gap-4">
        <TextLabel>Choose Biometric Type</TextLabel>
        <Tabs value={value} onValueChange={setValue}>
          <TabsList className="flex-row items-start justify-start w-full gap-4">
            {biometricTypes.includes(
              LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
            ) && (
              <TabsTrigger value="faceid" className="bg-dark-primary">
                <TextMd>Face ID</TextMd>
              </TabsTrigger>
            )}
            {biometricTypes.includes(
              LocalAuthentication.AuthenticationType.FINGERPRINT,
            ) && (
              <TabsTrigger value="fingerprint" className="bg-dark-error">
                <TextMd>Fingerprint</TextMd>
              </TabsTrigger>
            )}
          </TabsList>

          {biometricTypes.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
          ) && (
            <TabsContent className="pt-4 w-full" value="faceid">
              <FaceID />
            </TabsContent>
          )}
          {biometricTypes.includes(
            LocalAuthentication.AuthenticationType.FINGERPRINT,
          ) && (
            <TabsContent className="w-full h-40" value="fingerprint">
              <FingerPrint />
            </TabsContent>
          )}
        </Tabs>
      </View>
    </DefaultCard>
  );
};
