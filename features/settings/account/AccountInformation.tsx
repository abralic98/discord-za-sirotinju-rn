import { ConfirmationButtons } from "@/components/custom/ConfirmationButtons";
import { DefaultCard } from "@/components/custom/DefaultCard";
import { FormInput } from "@/components/input/FormInput";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store";
import {
  UpdateUserDocument,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { showSuccess } from "@/helpers/Toast";
import { requestWithAuth } from "@/lib/graphql/client";
import { TextLabel } from "@/lib/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { updateUserSchema } from "../zod";

export const AccountInformation = () => {
  const { user } = useAuthStore();
  const { refetch } = useAuth();
  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user?.username,
      description: user?.description,
      email: user?.email,
      phoneNumber: String(user?.phoneNumber),
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateUserInput) => {
      const modifiedData: UpdateUserMutationVariables = {
        user: data,
      };
      console.log(modifiedData.user, "mod");
      const res = await requestWithAuth<UpdateUserMutation>(
        UpdateUserDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      showSuccess({ title: "User Updated" });
      refetch();
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const submit = (data: UpdateUserInput) => {
    updateUserMutation.mutateAsync(data);
  };
  return (
    <DefaultCard>
      <TextLabel>Account information</TextLabel>
      <FormProvider {...form}>
        <FormInput<UpdateUserInput> label="Username" name="username" />
        <FormInput<UpdateUserInput> label="About you" name="description" />
        <FormInput<UpdateUserInput> label="Email" name="email" />
        <FormInput<UpdateUserInput>
          label="Phone number"
          name="phoneNumber"
          keyboardType="numeric"
        />
        <ConfirmationButtons
          submitText="Save"
          cancel={form.reset}
          submit={form.handleSubmit(submit)}
        />
      </FormProvider>
    </DefaultCard>
  );
};
