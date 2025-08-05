import React from "react";
import Svg, { Rect, Path, Circle, SvgProps } from "react-native-svg";

const EZLogoDark = (props: SvgProps) => (
  <Svg
    width={props.width ?? 100}
    height={props.width ?? 100}
    viewBox="0 0 100 100"
    {...props}
  >
    <Rect width={98} height={98} x={1} y={1} fill="#333" rx={10} />
    <Path
      fill="none"
      stroke="#f0f0f0"
      strokeLinecap="round"
      strokeWidth={5}
      d="M30 50a20 20 0 0 1 40 0"
    />
    <Rect width={12} height={24} x={22} y={50} fill="#f0f0f0" rx={6} />
    <Rect width={12} height={24} x={66} y={50} fill="#f0f0f0" rx={6} />
    <Path stroke="#f0f0f0" strokeWidth={3} d="M34 50v10M66 50v10" />
    <Path fill="none" stroke="#f0f0f0" strokeWidth={2} d="M70 72q8 8-10 14" />
    <Circle cx={60} cy={86} r={3} fill="#f0f0f0" />
  </Svg>
);

export default EZLogoDark;
