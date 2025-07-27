import React, { useMemo, useRef, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Button } from "./ui/Button";
import { TextMd } from "@/lib/typography";

interface CustomBottomSheetProps {
  trigger: (open: () => void) => ReactNode;
  children: ReactNode;
  actionButtons: {
    close?: () => void;
    confirm: () => void;
  };
  snapPoints?: (string | number)[];
}

export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  trigger,
  children,
  actionButtons,
  snapPoints = ["60%"],
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  const open = () => {
    sheetRef.current?.present();
  };

  const close = () => {
    sheetRef.current?.close();
  };

  return (
    <>
      {trigger(open)}
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={memoizedSnapPoints}
        index={0}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "#272d38" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
      >
        <BottomSheetView style={styles.content}>
          {children}
          {actionButtons && (
            <View className="flex-row justify-between">
              <Button
                onPress={() => {
                  actionButtons.close ?? close();
                }}
                variant={"destructive"}
                className="min-w-[150px]"
              >
                <TextMd>Cancel</TextMd>
              </Button>
              <Button
                className="min-w-[150px]"
                onPress={() => {
                  actionButtons.confirm();
                  close();
                }}
              >
                <TextMd>Create Room</TextMd>
              </Button>
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
});
