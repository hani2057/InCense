import React, { useState } from "react";
import CheckboxPickOne from "../../../components/common/CheckboxPickOne/CheckboxPickOne";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import CardComponent from "../../ListPage/CardComponent";
import { ProfileOutletContainer } from "../ProfilePage/style";
import { ProfilePerfumeHeader } from "./style";

const ProfilePerfumes = () => {
  const [typeIdx, setTypeIdx] = useState(0);

  const data = [
    {
      id: 0,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
    {
      id: 1,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
    {
      id: 2,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
    {
      id: 3,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
    {
      id: 4,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
    {
      id: 5,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
    {
      id: 6,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
    {
      id: 7,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
    {
      id: 8,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
    {
      id: 9,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
    {
      id: 10,
      name: "향수 이름입니다",
      brandName: "brand입니다",
      topNoteName: ["note1", "note2", "note3", "note4"],
      middleNoteName: ["note1", "note2", "note3", "note4"],
      baseNoteName: ["note1", "note2", "note3", "note4"],
      price: 1,
      volume: 0,
      gender: 0,
      rating: 0,
    },
  ];

  // {
  //   id: 0,
  //   name: "향수 이름입니다",
  //   brandName: "brand입니다",
  //   topNoteName: ["note1", "note2", "note3", "note4"],
  //   middleNoteName: ["note1", "note2", "note3", "note4"],
  //   baseNoteName: ["note1", "note2", "note3", "note4"],
  //   price: 1,
  //   volume: 0,
  //   gender: 0,
  //   rating: 0,
  // }

  return (
    <ProfileOutletContainer>
      <ProfilePerfumeHeader>
        <CheckboxPickOne
          textArr={["I have it", "I had it", "I want it"]}
          pickedIdx={typeIdx}
          setPickedIdx={setTypeIdx}
          width="50%"
          padding="0 5%"
          color="dark-gray"
        />
        <FlexDiv
          width="50%"
          padding="0 5%"
          style={{ borderLeft: "2px solid var(--gray-color)" }}
        >
          <FlexDiv justify="start">
            <img
              src="/assets/icons/search.svg"
              alt="search"
              style={{ cursor: "pointer" }}
            />
            <span style={{ cursor: "pointer" }}>목록에 향수 추가</span>
          </FlexDiv>
          <FlexDiv direction="column" align="end">
            <span style={{ cursor: "pointer" }}>내 취향에 반영하기</span>
            <span
              style={{
                fontSize: "0.625rem",
                position: "relative",
                top: "0.5rem",
              }}
            >
              마지막 반영일자 Feb 10, 2023
            </span>
          </FlexDiv>
        </FlexDiv>
      </ProfilePerfumeHeader>

      <FlexDiv wrap="wrap" justify="start" margin="3rem 0">
        {data.map(({ id, name }) => (
          <CardComponent key={id} />
        ))}
      </FlexDiv>
    </ProfileOutletContainer>
  );
};

export default ProfilePerfumes;
