import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import { ModalSpan } from "../SearchModal/style";
import SearchModal from "../SearchModal/SearchModal";
import api from "../../../apis/api";
import { ProfilePerfumeItemWrapper } from "../../../pages/Profile/ProfilePerfumePage/style";

const PerfumeItem = ({
  perfumeId,
  myPerfumeId,
  img,
  name,
  brand,
  preference,
  review,
  alarm,
  typeIdx,
  setTypeIdx,
  fetchGetPerfumeList,
}) => {
  const navigate = useNavigate();

  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchDeletePerfume = async () => {
    // console.log(myPerfumeId);
    const res = await api.profile.deletePerfumeFromCategory(myPerfumeId);
    // console.log(res);
    setDeleteModalOpen(false);
  };

  return (
    <>
      <ProfilePerfumeItemWrapper width="25%" direction="column" padding="1rem">
        <FlexDiv justify="end">
          {alarm && (
            <BsBell
              style={{ color: "var(--dark-gray-color)", strokeWidth: "1" }}
            />
          )}
        </FlexDiv>
        <img
          src={`https://j8a804.p.ssafy.io/api/display?filename=${img}`}
          alt="perfume"
          style={{ width: "60%", cursor: "pointer" }}
          onClick={() => navigate(`/detail/${perfumeId}`)}
        />
        <FlexDiv justify="space-between">
          <FlexDiv direction="column" align="start">
            <ModalSpan size="0.75rem" margin="0.5rem 0 0.2rem 0">
              {brand}
            </ModalSpan>
            <ModalSpan bold={true}>{name}</ModalSpan>
          </FlexDiv>
          <FlexDiv justify="end" width="auto">
            <img
              src="/assets/icons/edit.svg"
              alt="edit"
              style={{ cursor: "pointer", width: "1rem" }}
              onClick={() => setModifyModalOpen(true)}
            />
            <img
              src="/assets/icons/delete.svg"
              alt="delete"
              style={{
                cursor: "pointer",
                width: "1rem",
                marginLeft: "0.3rem",
                stroke: "1",
              }}
              onClick={() => setDeleteModalOpen(true)}
            />
          </FlexDiv>
        </FlexDiv>

        {deleteModalOpen && (
          <FlexDiv
            direction="column"
            padding="1rem"
            style={{
              backgroundColor: "var(--dark-gray-color)",
              opacity: "0.8",
              position: "absolute",
            }}
          >
            <ModalSpan color="white" size="1.2rem">
              목록에서 삭제할까요?
            </ModalSpan>
            <FlexDiv height="auto">
              <ModalSpan
                color="white"
                margin="2rem 0.5rem"
                pointer={true}
                onClick={() => fetchDeletePerfume()}
              >
                삭제
              </ModalSpan>
              <ModalSpan
                color="white"
                margin="2rem 0.5rem"
                pointer={true}
                onClick={() => setDeleteModalOpen(false)}
              >
                취소
              </ModalSpan>
            </FlexDiv>
          </FlexDiv>
        )}
      </ProfilePerfumeItemWrapper>

      {modifyModalOpen && (
        <SearchModal
          setModalOpen={setModifyModalOpen}
          modalType={"modify"}
          perfumeToModify={{
            image: img,
            brandName: brand,
            name: name,
            preference: preference,
            review: review,
            id: myPerfumeId,
          }}
          typeIdx={typeIdx}
          setTypeIdx={setTypeIdx}
          fetchGetPerfumeList={fetchGetPerfumeList}
        />
      )}
    </>
  );
};

export default PerfumeItem;
