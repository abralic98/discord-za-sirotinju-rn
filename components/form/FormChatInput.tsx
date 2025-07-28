import { useFormContext, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input, RNInputProps } from "../input/Input";
import { TextSm } from "@/lib/typography";
import { View } from "react-native";

type FormChatInputProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
} & Omit<RNInputProps, "value" | "onChangeText">;

export const FormChatInput = <T extends FieldValues>({
  name,
  icon,
  placeholder,
  inputClassName,
  containerClassName,
  ...rest
}: FormChatInputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <View className={cn("flex flex-col gap-1", containerClassName)}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            icon={icon}
            className={cn(
              "border h-40",
              error && "border-red-500",
              inputClassName,
            )}
            {...rest}
          />
        )}
      />

      {error && (
        <TextSm className="text-red-500 text-sm">
          {String(error.message)}
        </TextSm>
      )}
    </View>
  );
};
