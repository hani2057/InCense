import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import api from "../../../apis/api";
import { updateTasteTime } from "../../../store/slice/userSlice";
import CheckboxPickOne from "../../../components/common/CheckboxPickOne/CheckboxPickOne";
import SearchModal from "../../../components/Profile/SearchModal/SearchModal";
import PerfumeItem from "../../../components/Profile/PerfumeItem/PerfumeItem";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";
import { ProfileOutletContainer } from "../ProfilePage/style";
import { ProfilePerfumeHeader, ProfilePerfumeHeaderSpan } from "./style";

const ProfilePerfumes = () => {
  const dispatch = useDispatch();
  const { lastTasteUpdate } = useSelector((state) => state.userReducers);

  const [typeIdx, setTypeIdx] = useState(0);
  const [perfumes, setPerfumes] = useState(null);
  const [serchModalOpen, setSearchModalOpen] = useState(false);

  // have, had, want 향수 목록 가져오기
  const fetchGetPerfumeList = async () => {
    const arr = ["HAVE", "HAD", "WANT"];
    const res = await api.profile.getPerfumeList(arr[typeIdx]);
    setPerfumes(res);
  };

  // 내 취향에 반영하기 요청
  const fetchUpdateTaste = async () => {
    await api.analysis.getUpdateTaste();
    dispatch(
      updateTasteTime({ updateTasteTime: dayjs().format("YYYY-MM-DD") })
    );
  };

  useEffect(() => {
    fetchGetPerfumeList();
  }, [typeIdx, lastTasteUpdate]);

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
              <ProfilePerfumeHeaderSpan onClick={() => fetchUpdateTaste()}>
                내 취향에 반영하기
              </ProfilePerfumeHeaderSpan>
              <span
                style={{
                  fontSize: "0.625rem",
                  position: "relative",
                  top: "0.5rem",
                }}
              >
                {lastTasteUpdate
                  ? `마지막 반영일자 ${dayjs(lastTasteUpdate)
                      .locale("en")
                      .format("MMM DD, YYYY")}`
                  : "아직 취향 정보가 없어요"}
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
