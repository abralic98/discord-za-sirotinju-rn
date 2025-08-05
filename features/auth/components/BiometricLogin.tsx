import * as LocalAuthentication from "expo-local-authentication";
import { TextMd } from "@/lib/typography";
import { FingerprintIcon } from "lucide-nativewind";
import React, { useEffect, useState } from "react";
import { ModifiedPressable } from "./ModifiedPressable";
import { useMutation } from "@tanstack/react-query";
import {
  CreateSessionDocument,
  CreateSessionMutation,
  MutationCreateSessionArgs,
} from "@/generated/graphql";
import { publicClient } from "@/lib/graphql/client";
import { useAuthStore } from "../store";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import routes from "@/lib/routes";
import { useRouter } from "expo-router";
import { getFromStorage } from "@/lib/secure-storage/storage";
import { StorageKeys } from "@/lib/secure-storage/storageKeys";

export const BiometricLogin = () => {
  const { setAuth } = useAuthStore();
  const { replace } = useRouter();
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const authorize = async () => {
    //
    const res = await LocalAuthentication.authenticateAsync();
    if (res.success) {
      createSessionMutation.mutateAsync();
    }
  };

  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const username = await getFromStorage(StorageKeys.USERNAME);
      const password = await getFromStorage(StorageKeys.PASSWORD);
      if (!username || !password) return;
      const modifiedData: MutationCreateSessionArgs = {
        credentials: {
          username,
          password,
        },
      };
      return publicClient.request<CreateSessionMutation>(
        CreateSessionDocument,
        modifiedData,
      );
    },
    onSuccess: (res) => {
      if (res?.createSession?.token && res?.createSession.user) {
        setAuth(res.createSession.token, res.createSession.user);
        replace(routes.dashboard);
      }
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  useEffect(() => {
    const loadBiometricSetting = async () => {
      const storedValue = await getFromStorage(StorageKeys.ISBIOMETRICACTIVE);
      setIsActive(storedValue === "true");
    };
    loadBiometricSetting();
  }, []);

  return (
    <ModifiedPressable disabled={!isActive} action={authorize}>
      <FingerprintIcon className="w-10 h-10 text-white" />
      <TextMd className="font-semibold text-center">Biometric Login</TextMd>
    </ModifiedPressable>
  );
};
