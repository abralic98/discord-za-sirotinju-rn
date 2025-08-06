import EZLogoDark from "@/assets/logo/EZLogoDark";
import Center from "@/components/Center";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { RegisterForm } from "@/features/auth/RegisterForm";
import { TextXl3 } from "@/lib/typography";
import React from "react";

export default function Register() {
  return (
    <ParallaxScrollView headerImage={<EzComms />}>
      <RegisterForm />
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
