import { TextMd } from "@/lib/typography";
import { FingerprintIcon } from "lucide-nativewind";
import React from "react";
import { ModifiedPressable } from "./ModifiedPressable";

export const GoogleLogin = () => {
  const authenticate = () => {
    //
  };
  return (
    <ModifiedPressable action={authenticate}>
      <FingerprintIcon className="w-10 h-10 text-white" />
      <TextMd className="font-semibold">Google Login</TextMd>
    </ModifiedPressable>
  );
};
