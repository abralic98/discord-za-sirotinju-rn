import { cn } from "@/lib/utils";
import * as Slot from "../primitives/Slot";
import * as React from "react";
import { Text as RNText } from "react-native";

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
}) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn(
        "text-base text-foreground web:select-text",
        textClass,
        className,
      )}
      {...props}
    />
  );
}

export { Text, TextClassContext };
