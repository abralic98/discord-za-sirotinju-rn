import React from "react";
import { Dimensions } from "react-native";
import * as Progress from "react-native-progress";

export const ProgressBar = ({ progress }: { progress: number }) => {
  const width = Dimensions.get("window").width - 100;

  return (
    <Progress.Bar
      progress={progress}
      borderColor="#334155"
      color="#7785cc"
      height={10}
      width={width}
    />
  );
};
