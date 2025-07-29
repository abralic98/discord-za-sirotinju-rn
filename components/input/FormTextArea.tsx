import React from "react";
import { Text, View } from "react-native";
import {
  useFormContext,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { TextSm } from "@/lib/typography";
import { Textarea } from "../ui/text-area";

type TextareaProps = React.ComponentProps<typeof Textarea>;

type FormTextAreaProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
} & Omit<TextareaProps, "value" | "onChangeText">;

export const FormTextArea = <T extends FieldValues>({
  name,
  label,
  className,
  ...rest
}: FormTextAreaProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <View className="flex flex-col gap-1">
      {label && <TextSm className="font-bold">{label}</TextSm>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Textarea
            value={value}
            onChangeText={onChange}
            className={cn(error && "border-destructive", className)}
            {...rest}
          />
        )}
      />

      {error && (
        <Text className="text-red-500 text-sm">{String(error.message)}</Text>
      )}
    </View>
  );
};
