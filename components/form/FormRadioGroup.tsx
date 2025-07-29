import React from "react";
import {
  useFormContext,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";
import { TextMd } from "@/lib/typography";

type FormRadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  className?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
};

export const FormRadioGroup = <T extends FieldValues>({
  name,
  label,
  className,
  options,
  disabled = false,
}: FormRadioGroupProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <View className={cn("gap-2", className)}>
      {label && <TextMd className="font-bold mb-1">{label}</TextMd>}

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <View className="flex-row gap-3 flex-wrap">
            {options.map((option) => {
              const isSelected = value === option.value;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => onChange(option.value)}
                  disabled={disabled}
                  className={cn(
                    "h-10 min-w-24 px-4 rounded-full justify-center items-center border border-gray-500",
                    isSelected ? "bg-dark-primary" : "bg-dark-server",
                    disabled && "opacity-50",
                  )}
                >
                  <TextMd
                    className={cn(
                      "text-center text-white",
                    )}
                  >
                    {option.label}
                  </TextMd>
                </Pressable>
              );
            })}
          </View>
        )}
      />

      {error && (
        <Text className="text-red-500 text-sm">{String(error.message)}</Text>
      )}
    </View>
  );
};
