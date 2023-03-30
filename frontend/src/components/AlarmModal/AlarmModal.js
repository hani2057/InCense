import React from "react";
import AlarmItem from "./AlarmItem";
import { AlarmContainer } from "./style";

const AlarmModal = () => {
  // 더미데이터
  const data = [
    { createdAt: "2023-03-29", brand: "Diptyque", name: "fleur de peau" },
    { createdAt: "2023-03-29", brand: "Diptyque", name: "fleur de peau" },
    { createdAt: "2023-03-29", brand: "Diptyque", name: "fleur de peau" },
    { createdAt: "2023-03-29", brand: "Diptyque", name: "fleur de peau" },
  ];

  return (
    <AlarmContainer>
      {data.map(({ createdAt, brand, name }, idx) => (
        <AlarmItem createdAt={createdAt} brand={brand} name={name} key={idx} />
      ))}
    </AlarmContainer>
  );
};

export default AlarmModal;
