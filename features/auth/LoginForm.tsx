import { FormInput } from "@/components/input/FormInput";
import { KeyboardAvoidingWrapper } from "@/components/KeyboardAvoidingWrapper";
import { Button } from "@/components/ui/Button";
import {
  CreateSessionDocument,
  CreateSessionInput,
  CreateSessionMutation,
  MutationCreateSessionArgs,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { showSuccess } from "@/helpers/Toast";
import { client } from "@/lib/graphql/client";
import { saveToStorage } from "@/lib/keys/storage";
import { StorageKeys } from "@/lib/keys/storageKeys";
import routes from "@/lib/routes";
import { TextSm } from "@/lib/typography";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";

export const LoginForm = () => {
  const form = useForm<CreateSessionInput>();
  const { replace } = useRouter();

  const createSessionMutation = useMutation({
    mutationFn: async (data: CreateSessionInput) => {
      const modifiedData: MutationCreateSessionArgs = { credentials: data };
      return client.request<CreateSessionMutation>(
        CreateSessionDocument,
        modifiedData,
      );
    },
    onSuccess: (res) => {
      if (res.createSession?.token && res.createSession.user) {
        saveToStorage(StorageKeys.TOKEN, res.createSession.token);
        showSuccess({ title: "Login" });
        replace(routes.dashboard);
      }
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const onSubmit = async (data: CreateSessionInput) => {
    createSessionMutation.mutateAsync(data);
  };

  return (
    <KeyboardAvoidingWrapper keyboardVerticalOffset={360}>
      <FormProvider {...form}>
        <View className="flex flex-col h-full justify-between">
          <View className="gap-4">
            <FormInput<CreateSessionInput> label="Username" name="username" />
            <FormInput<CreateSessionInput>
              secure={true}
              label="Password"
              name="password"
            />
          </View>
          <Button onPress={form.handleSubmit(onSubmit)}>
            <TextSm className="text-black font-bold">Login</TextSm>
          </Button>
        </View>
      </FormProvider>
    </KeyboardAvoidingWrapper>
  );
};
