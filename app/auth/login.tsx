import EZLogoDark from "@/assets/logo/EZLogoDark";
import Center from "@/components/Center";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { LoginForm } from "@/features/auth/LoginForm";
import { TextXl3 } from "@/lib/typography";
import React from "react";

export default function Login() {
  return (
    <ParallaxScrollView headerImage={<EzComms />}>
      <LoginForm />
    </ParallaxScrollView>
  );
}

const EzComms = () => {
  return (
    <Center>
      <TextXl3 className="font-bold">EZComms</TextXl3>
      <EZLogoDark />
    </Center>
  );
};
