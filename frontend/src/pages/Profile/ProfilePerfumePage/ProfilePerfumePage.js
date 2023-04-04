import React, { useState, useEffect } from "react";
import api from "../../../apis/api";
import CheckboxPickOne from "../../../components/common/CheckboxPickOne/CheckboxPickOne";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import SearchModal from "../../../components/Profile/SearchModal/SearchModal";
import PerfumeItem from "../../../components/Profile/PerfumeItem/PerfumeItem";
import { ProfileOutletContainer } from "../ProfilePage/style";
import { ProfilePerfumeHeader, ProfilePerfumeHeaderSpan } from "./style";

const ProfilePerfumes = () => {
  const [typeIdx, setTypeIdx] = useState(0);
  const [perfumes, setPerfumes] = useState(null);
  const [serchModalOpen, setSearchModalOpen] = useState(false);

  const fetchGetPerfumeList = async () => {
    const arr = ["HAVE", "HAD", "WANT"];
    const res = await api.profile.getPerfumeList(arr[typeIdx]);
    setPerfumes(res);
    console.log(res);
  };

  useEffect(() => {
    fetchGetPerfumeList();
  }, [typeIdx]);

  if (!perfumes) return null;

  return (
    <>
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
            padding="0 2%"
            style={{ borderLeft: "2px solid var(--gray-color)" }}
          >
            <FlexDiv justify="start">
              <img
                src="/assets/icons/search.svg"
                alt="search"
                style={{ cursor: "pointer" }}
              />
              <span
                onClick={() => setSearchModalOpen(true)}
                style={{ cursor: "pointer" }}
              >
                목록에 향수 추가
              </span>
            </FlexDiv>
            <FlexDiv direction="column" align="end">
              <ProfilePerfumeHeaderSpan>
                내 취향에 반영하기
              </ProfilePerfumeHeaderSpan>
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
          {perfumes.map(
            ({
              perfumeId,
              myPerfumeId,
              image,
              perfumeName,
              brandName,
              alarm,
              preference,
              comment,
            }) => (
              <PerfumeItem
                perfumeId={perfumeId}
                myPerfumeId={myPerfumeId}
                img={image}
                name={perfumeName}
                brand={brandName}
                alarm={alarm}
                preference={preference}
                review={comment}
                typeIdx={typeIdx}
                setTypeIdx={setTypeIdx}
                fetchGetPerfumeList={fetchGetPerfumeList}
                key={perfumeId}
              />
            )
          )}
        </FlexDiv>
      </ProfileOutletContainer>

      {serchModalOpen && (
        <SearchModal
          setModalOpen={setSearchModalOpen}
          typeIdx={typeIdx}
          setTypeIdx={setTypeIdx}
          fetchGetPerfumeList={fetchGetPerfumeList}
        />
      )}
    </>
  );
};

export default ProfilePerfumes;
