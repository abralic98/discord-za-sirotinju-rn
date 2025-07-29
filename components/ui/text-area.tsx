import { cn } from "@/lib/utils";
import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";

function Textarea({
  className,
  multiline = true,
  numberOfLines = 4,
  placeholderClassName,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
}) {
  return (
    <TextInput
      className={cn(
        "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 native:text-md bg-dark-input text-white  placeholder:text-muted-foreground ",
        props.editable === false && "opacity-50",
        className,
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical="top"
      {...props}
    />
  );
}

export { Textarea };
