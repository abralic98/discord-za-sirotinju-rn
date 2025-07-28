import * as React from "react";
import { View, TextInput, TextInputProps, Pressable } from "react-native";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-nativewind";

type RNInputProps = TextInputProps & {
  secure?: boolean;
  icon?: React.ReactNode;
  onPressIcon?: () => void;
};

const Input = React.forwardRef<TextInput, RNInputProps>(
  (
    { secure, icon, onPressIcon, className, editable = true, ...props },
    ref,
  ) => {
    const [secured, setSecured] = React.useState(!!secure);

    return (
      <View className="relative w-full">
        <TextInput
          ref={ref}
          secureTextEntry={secured}
          editable={editable}
          placeholderTextColor="#9ca3af"
          className={cn(
            "h-12 w-full rounded-md border border-input bg-dark-input pl-3 pr-10 text-white",
            "placeholder:text-gray",
            !editable && "opacity-50",
            className,
          )}
          {...props}
        />

        {icon && (
          <Pressable
            onPress={onPressIcon}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {icon}
          </Pressable>
        )}

        {secure && (
          <Pressable
            onPress={() => setSecured(!secured)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {secured ? (
              <EyeIcon size={20} className="text-white" />
            ) : (
              <EyeOffIcon size={20} className="text-white" />
            )}
          </Pressable>
        )}
      </View>
    );
  },
);

Input.displayName = "Input";

export { Input };
