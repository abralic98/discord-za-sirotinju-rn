import { FormInput } from "@/components/input/FormInput";
import { KeyboardAvoidingWrapper } from "@/components/KeyboardAvoidingWrapper";
import { Button } from "@/components/ui/Button";
import {
  CreateUserDocument,
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { showSuccess } from "@/helpers/Toast";
import { publicClient } from "@/lib/graphql/client";
import routes from "@/lib/routes";
import { TextSm } from "@/lib/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { registerSchema } from "./zod";

export interface CreateUserInputModified extends CreateUserInput {
  confirmPassword: string;
}

export const RegisterForm = () => {
  const form = useForm<CreateUserInputModified>({
    resolver: zodResolver(registerSchema),
  });
  const { replace } = useRouter();

  const createSessionMutation = useMutation({
    mutationFn: async (data: CreateUserInputModified) => {
      const { confirmPassword, ...rest } = data;
      return publicClient.request<CreateUserMutation>(CreateUserDocument, {
        user: rest,
      });
    },
    onSuccess: (res) => {
      if (res.createUser) {
        showSuccess({ title: "Success" });
        replace(routes.login);
      }
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const onSubmit = async (data: CreateUserInputModified) => {
    createSessionMutation.mutateAsync(data);
  };

  return (
    <KeyboardAvoidingWrapper keyboardVerticalOffset={260}>
      <FormProvider {...form}>
        <View className="flex flex-col h-full justify-between">
          <View className="gap-4">
            <FormInput<CreateUserInputModified>
              label="Username"
              name="username"
            />
            <FormInput<CreateUserInputModified>
              label="Email"
              keyboardType="email-address"
              name="email"
            />
            <FormInput<CreateUserInputModified>
              secure={true}
              label="Password"
              name="password"
            />
            <FormInput<CreateUserInputModified>
              secure={true}
              label="Confirm Password"
              name="confirmPassword"
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
