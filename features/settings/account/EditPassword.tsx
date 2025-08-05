import { ConfirmationButtons } from "@/components/custom/ConfirmationButtons";
import { DefaultCard } from "@/components/custom/DefaultCard";
import { FormInput } from "@/components/input/FormInput";
import {
  UpdateUserPasswordDocument,
  UpdateUserPasswordInput,
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables,
} from "@/generated/graphql";
import { TextLabel } from "@/lib/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { updateUserPasswordSchema } from "../zod";
import { requestWithAuth } from "@/lib/graphql/client";
import { showSuccess } from "@/helpers/Toast";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";

export const EditPassword = () => {
  const form = useForm<UpdateUserPasswordInput>({
    resolver: zodResolver(updateUserPasswordSchema),
  });

  const updateUserPasswordMutation = useMutation({
    mutationFn: async (data: UpdateUserPasswordInput) => {
      const modifiedData: UpdateUserPasswordMutationVariables = {
        credentials: data,
      };
      const res = await requestWithAuth<UpdateUserPasswordMutation>(
        UpdateUserPasswordDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      showSuccess({ title: "Password Updated!" });
      form.reset()
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const onSubmit = async (data: UpdateUserPasswordInput) => {
    updateUserPasswordMutation.mutateAsync(data);
  };

  return (
    <DefaultCard>
      <TextLabel>Configure password</TextLabel>
      <FormProvider {...form}>
        <FormInput<UpdateUserPasswordInput>
          name="currentPassword"
          label={"Current password"}
          secure={true}
        />
        <FormInput<UpdateUserPasswordInput>
          name="newPassword"
          label={"New password"}
          secure={true}
        />
        <FormInput<UpdateUserPasswordInput>
          name="confirmNewPassword"
          label={"Confirm password"}
          secure={true}
        />
        <ConfirmationButtons
          submitText="Save"
          cancel={form.reset}
          submit={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </DefaultCard>
  );
};
