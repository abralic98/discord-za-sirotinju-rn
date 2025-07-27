import React from "react";
import { View, Switch, Text } from "react-native";
import { useFormContext, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { TextMd, TextSm } from "@/lib/typography";

type FormSwitchProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  className?: string;
  disabled?: boolean;
};

export const FormSwitch = <T extends FieldValues>({
  name,
  label,
  className,
  disabled = false,
}: FormSwitchProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <View className="flex-row gap-4 items-center">
      {label && <TextMd className="font-bold">{label}</TextMd>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Switch
            value={!!value}
            onValueChange={onChange}
            disabled={disabled}
            className={cn(error && "border-red-500", className)}
          />
        )}
      />

      {error && (
        <Text className="text-red-500 text-sm">{String(error.message)}</Text>
      )}
    </View>
  );
};
