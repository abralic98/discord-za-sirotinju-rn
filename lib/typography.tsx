import { PropsWithChildren } from "react";
import { Text } from "react-native";
import { cn } from "./utils";

export const TextSm = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <Text className={cn("text-white text-sm", className)}>{children}</Text>
  );
};

export const TextMd = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <Text className={cn("text-white text-base", className)}>{children}</Text>
  );
};

export const TextLg = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <Text style={{ fontSize: 18 }} className={cn("text-white font-semibold", className)}>
      {children}
    </Text>
  );
};

export const TextXl = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <Text
      style={{ fontSize: 20 }}
      className={cn("text-white text-xl font-semibold", className)}
    >
      {children}
    </Text>
  );
};

export const TextXl2 = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <Text
      style={{ fontSize: 22 }}
      className={cn("text-white text-2xl font-semibold", className)}
    >
      {children}
    </Text>
  );
};

export const TextXl3 = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <Text
      style={{ fontSize: 24 }}
      className={cn("text-white text-3xl font-semibold", className)}
    >
      {children}
    </Text>
  );
};
