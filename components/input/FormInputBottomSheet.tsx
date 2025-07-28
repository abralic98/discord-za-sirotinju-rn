import React, { memo, useCallback, useEffect, forwardRef, useRef } from "react";
import {
  Text,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { useFormContext, Controller, FieldValues, Path } from "react-hook-form";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import { TextSm } from "@/lib/typography";

type InputProps = React.ComponentProps<typeof Input>;

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  icon?: React.ReactNode;
} & Omit<InputProps, "value" | "onChangeText">;

export const FormInputBottomSheet = <T extends FieldValues>({
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

  // za bottom modal da radi keyboard
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  const handleOnFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = true;
      rest.onFocus?.(e);
    },
    [rest.onFocus, shouldHandleKeyboardEvents],
  );

  const handleOnBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = false;
      rest.onBlur?.(e);
    },
    [rest.onBlur, shouldHandleKeyboardEvents],
  );

  useEffect(() => {
    return () => {
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  //////////////////////////////

  return (
    <View className="flex flex-col gap-1">
      {label && <TextSm className="font-bold">{label}</TextSm>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            secure={secure}
            autoCapitalize="none"
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
