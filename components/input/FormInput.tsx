import React from "react";
import { Text, View } from "react-native";
import { useFormContext, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import { TextSm } from "@/lib/typography";

type InputProps = React.ComponentProps<typeof Input>;

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  icon?: React.ReactNode;
} & Omit<InputProps, "value" | "onChangeText">;

export const FormInput = <T extends FieldValues>({
  name,
  label,
  icon,
  secure = false,
  className,
  ...rest
}: FormInputProps<T>) => {
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
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secure={secure}
            icon={icon}
            className={cn("border", error && "border-destructive", className)}
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
