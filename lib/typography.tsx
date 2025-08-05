import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";
import { cn } from "./utils";

interface CustomTextProps extends PropsWithChildren, TextProps {
  className?: string;
}

export const TextSm = ({ children, className, ...rest }: CustomTextProps) => {
  return (
    <Text className={cn("text-white text-sm", className)} {...rest}>
      {children}
    </Text>
  );
};

export const TextMd = ({ children, className, ...rest }: CustomTextProps) => {
  return (
    <Text className={cn("text-white text-base", className)} {...rest}>
      {children}
    </Text>
  );
};

export const TextLabel = ({
  children,
  className,
  ...rest
}: CustomTextProps) => {
  return (
    <Text
      className={cn("text-white font-semibold opacity-60", className)}
      {...rest}
    >
      {children}
    </Text>
  );
};

export const TextLg = ({ children, className, ...rest }: CustomTextProps) => {
  return (
    <Text
      style={{ fontSize: 18 }}
      className={cn("text-white font-semibold", className)}
      {...rest}
    >
      {children}
    </Text>
  );
};

export const TextXl = ({ children, className, ...rest }: CustomTextProps) => {
  return (
    <Text
      style={{ fontSize: 20 }}
      className={cn("text-white  font-semibold", className)}
      {...rest}
    >
      {children}
    </Text>
  );
};

export const TextXl2 = ({ children, className, ...rest }: CustomTextProps) => {
  return (
    <Text
      style={{ fontSize: 22 }}
      className={cn("text-white  font-semibold", className)}
      {...rest}
    >
      {children}
    </Text>
  );
};

export const TextXl3 = ({ children, className, ...rest }: CustomTextProps) => {
  return (
    <Text
      style={{ fontSize: 24 }}
      className={cn("text-white font-semibold", className)}
      {...rest}
    >
      {children}
    </Text>
  );
};
