import { cn } from "@/lib/utils";
import { RelativePathString, useRouter } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable } from "react-native";

export const ModifiedPressable = ({
  children,
  action,
  disabled = false,
}: PropsWithChildren & { action: () => void; disabled?: boolean | null }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={action}
      className={cn(
        "w-[35%] h-32  rounded-3xl items-center justify-center p-4 gap-2 border-2 border-black",
        disabled ? "bg-gray-500" : "bg-dark-primary",
      )}
    >
      {children}
    </Pressable>
  );
};
