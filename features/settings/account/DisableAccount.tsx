import { Button } from "@/components/ui/Button";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { showSuccess } from "@/helpers/Toast";
import { TextMd } from "@/lib/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { deactivateUserSchema } from "../zod";
import {
  DeactivateUserDocument,
  DeactivateUserMutation,
  DeactivateUserMutationVariables,
  UpdateUserDocument,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserPresenceType,
} from "@/generated/graphql";
import { useAuthStore } from "@/features/auth/store";
import { useMutation } from "@tanstack/react-query";
import { requestWithAuth } from "@/lib/graphql/client";
import { CustomBottomSheet } from "@/components/CustomBottomSheet";
import { FormInputBottomSheet } from "@/components/input/FormInputBottomSheet";
import routes from "@/lib/routes";
import { useRouter } from "expo-router";

export const DisableAccount = () => {
  const { replace } = useRouter();
  const form = useForm<DeactivateUserMutationVariables>({
    resolver: zodResolver(deactivateUserSchema),
  });
  const { clearAuth } = useAuthStore();

  const disableUserMutation = useMutation({
    mutationFn: async () => {
      const res = await requestWithAuth<DeactivateUserMutation>(
        DeactivateUserDocument,
        {
          password: form.getValues("password"),
          confirmPassword: form.getValues("confirmPassword"),
        },
      );
      return res;
    },

    onSuccess: () => {
      showSuccess({ title: "User deactivated" });
      form.reset();
      replace(routes.login);
      clearAuth();
    },
    onError: (error) => {
      form.reset();
      handleGraphqlError(error);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async () => {
      const modifiedData: UpdateUserMutationVariables = {
        user: {
          userPresence: UserPresenceType.Offline,
        },
      };
      const res = await requestWithAuth<UpdateUserMutation>(
        UpdateUserDocument,
        modifiedData,
      );
      return res;
    },
  });

  const disableAccount = () => {
    Alert.alert(
      `Disable Account`,
      "You will be able to activate it again when you Login",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          style: "destructive",
          onPress: async () => {
            await updateUserMutation.mutateAsync();
            await disableUserMutation.mutateAsync();
          },
        },
      ],
      { cancelable: true },
    );
  };
  return (
    <CustomBottomSheet
      trigger={(open) => (
        <Button onPress={open} variant={"destructive"}>
          <TextMd className="font-semibold">Disable Account</TextMd>
        </Button>
      )}
      actionButtons={{
        confirm: {
          action: form.handleSubmit(disableAccount),
          text: "Submit",
        },
      }}
    >
      <FormProvider {...form}>
        <View className="flex flex-col w-full  gap-3">
          <FormInputBottomSheet<DeactivateUserMutationVariables>
            name="password"
            label="Password"
            secure={true}
          />
          <FormInputBottomSheet<DeactivateUserMutationVariables>
            name="confirmPassword"
            label="Confirm Password"
            secure={true}
          />
        </View>
      </FormProvider>
    </CustomBottomSheet>
  );
};
