import React from "react";
import { LoadingElement, LoadingWrapper } from "./style";

const Loading = () => {
  const loadingColors = [
    "#ffff00",
    "#76ff03",
    "#f06292",
    "#4fc3f7",
    "#ba68c8",
    "#f57c00",
    "#673ab7",
  ];

  return (
    <LoadingWrapper>
      {loadingColors.map((color, idx) => (
        <LoadingElement
          color={color}
          delaySec={`${-1.4 + idx * 0.2}s`}
          key={idx}
        />
      ))}
    </LoadingWrapper>
  );
};

export default Loading;
