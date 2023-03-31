import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import { ModalSpan } from "../SearchModal/style";
import SearchModal from "../SearchModal/SearchModal";

const PerfumeItem = ({
  perfumeId,
  memberPerfumeId,
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

  return (
    <>
      <FlexDiv
        width="25%"
        direction="column"
        padding="1rem"
        style={{ border: "1px solid var(--gray-color)" }}
      >
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
          <FlexDiv justify="end">
            <img
              src="/assets/icons/edit.svg"
              alt="edit"
              style={{ cursor: "pointer" }}
              onClick={() => setModifyModalOpen(true)}
            />
            <img
              src="/assets/icons/delete.svg"
              alt="delete"
              style={{ marginLeft: "0.5rem", stroke: "1", cursor: "pointer" }}
            />
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
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
            id: memberPerfumeId,
          }}
          typeIdx={typeIdx}
          setTypeIdx={setTypeIdx}
        />
      )}
    </>
  );
};

export default PerfumeItem;
