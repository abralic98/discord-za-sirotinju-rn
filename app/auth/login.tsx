import EZLogoDark from "@/assets/logo/EZLogoDark";
import Center from "@/components/Center";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { LoginForm } from "@/features/auth/LoginForm";
import { TextLg, TextXl, TextXl3 } from "@/lib/typography";
import React from "react";
import { Text, View } from "react-native";

export default function Login() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={"gray"}
      headerImage={<EzComms />}
    >
      <View>
        <LoginForm />
      </View>
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
