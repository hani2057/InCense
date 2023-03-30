import React, { useRef, useState } from "react";
import api from "../../../apis/api";
import useModal from "../../../hooks/useModal";
import CheckboxPickOne from "../../common/CheckboxPickOne/CheckboxPickOne";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import {
  ModalClose,
  ModalContainer,
  ModalContent,
  ModalWrapper,
} from "./style";

const SearchModal = ({
  setModalOpen,
  typeIdx,
  setTypeIdx,
  perfumeToModify,
  modalType,
}) => {
  const ref = useRef();
  useModal(ref, () => {
    setModalOpen(false);
  });

  const [perfumeInfo, setPerfumeInfo] = useState(perfumeToModify || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  console.log(searchQuery);
  console.log(searchResult);

  const textArr = ["I have it", "I had it", "I want it"];

  const fetchSearch = async () => {
    const res = await api.profile.searchPerfume(searchQuery);
    setSearchResult(res.content);
    console.log(res);
  };

  return (
    <ModalContainer>
      <ModalWrapper ref={ref}>
        <ModalClose ref={ref} onClick={() => setModalOpen(false)}>
          X
        </ModalClose>
        <ModalContent>
          <FlexDiv>
            <img />
            <FlexDiv direction="column">
              <div>
                <img src="/assets/icons/search.svg" alt="search" />
                <input
                  placeholder="향수를 검색하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") fetchSearch();
                  }}
                />
              </div>
              <span>{perfumeInfo?.brand}</span>
              <FlexDiv>
                <span>{perfumeInfo?.name}</span>
                <span>star</span>
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
          <span>{textArr[typeIdx]}</span>
          <CheckboxPickOne
            textArr={textArr}
            pickedIdx={typeIdx}
            setPickedIdx={setTypeIdx}
          />
          <textarea></textarea>
          <div>{modalType === "modify" ? "수정하기" : "추가하기"}</div>
        </ModalContent>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default SearchModal;
