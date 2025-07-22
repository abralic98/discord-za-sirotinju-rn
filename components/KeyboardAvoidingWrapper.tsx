import React, { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

type Props = {
  keyboardVerticalOffset?: number;
} & PropsWithChildren;
export const KeyboardAvoidingWrapper = ({
  children,
  keyboardVerticalOffset,
}: Props) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? (keyboardVerticalOffset ?? 120) : 0
      }
    >
      {children}
    </KeyboardAvoidingView>
  );
};
