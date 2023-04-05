import React, { useRef, useState } from "react";
import api from "../../../apis/api";
import useModal from "../../../hooks/useModal";
import StarRating from "../../../pages/DetailPage/StarRating";
import CheckboxPickOne from "../../common/CheckboxPickOne/CheckboxPickOne";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import SearchResult from "./SearchResult";
import {
  ModalContainer,
  ModalWrapper,
  ModalClose,
  ModalContent,
  ModalImg,
  ModalInput,
  SearchResultWrapper,
  ModalSpan,
  ModalReview,
  ModalSubmit,
  ModalErrorMsg,
} from "./style";

const SearchModal = ({
  setModalOpen,
  typeIdx,
  setTypeIdx,
  perfumeToModify,
  modalType,
  fetchGetPerfumeList,
}) => {
  // 모달
  const ref = useRef();
  useModal(ref, () => setModalOpen(false));

  const [perfumeInfo, setPerfumeInfo] = useState(perfumeToModify || null);
  const [newTypeIdx, setNewTypeIdx] = useState(typeIdx);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const textArr = ["I have it", "I had it", "I want it"];

  const fetchSearch = async () => {
    const res = await api.profile.searchPerfume(searchQuery);
    if (res.content.length) setSearchResult(res.content);
    else {
      setErrorMsg("검색 결과가 없습니다");
    }
  };

  const fetchPerfumeToList = async () => {
    if (!perfumeInfo) setErrorMsg("향수를 선택해주세요");
    else if (!perfumeInfo.preference && typeIdx !== 2)
      setErrorMsg("평점을 선택해주세요");
    else if (modalType === "modify") {
      const data = {
        category: textArr[newTypeIdx].split(" ")[1].toUpperCase(),
        comment: perfumeInfo.review || null,
        memberPerfumeId: perfumeInfo.id,
        preference: perfumeInfo.preference,
      };

      await api.profile.putPerfumeToCategory(data);
      setModalOpen(false);
      setTypeIdx(newTypeIdx);
      fetchGetPerfumeList();
    } else {
      const data = {
        category: textArr[newTypeIdx].split(" ")[1].toUpperCase(),
        comment: perfumeInfo.review || null,
        perfumeId: perfumeInfo.id,
        preference: perfumeInfo.preference,
      };

      await api.profile.postPerfumeToCategory(data);
      setModalOpen(false);
      setTypeIdx(newTypeIdx);
      fetchGetPerfumeList();
    }
  };

  return (
    <ModalContainer>
      <ModalWrapper ref={ref}>
        <ModalClose ref={ref} onClick={() => setModalOpen(false)}>
          X
        </ModalClose>
        <ModalContent>
          <FlexDiv align="start" height="8rem">
            <FlexDiv width="30%" height="auto">
              {perfumeInfo && (
                <ModalImg src={perfumeInfo.image} alt="perfume" height="8rem" />
              )}
            </FlexDiv>
            <FlexDiv direction="column" width="70%" align="start">
              {modalType === "modify" || (
                <FlexDiv
                  height="2.5rem"
                  gap="0.7rem"
                  justify="start"
                  style={{
                    border: "1px solid var(--gray-color)",
                    padding: "0.5rem",
                  }}
                >
                  <img src="/assets/icons/search.svg" alt="search" />
                  <ModalInput
                    placeholder="향수를 검색하세요"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setErrorMsg("");
                    }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        fetchSearch();
                        setSearchQuery("");
                      }
                    }}
                  />
                </FlexDiv>
              )}

              {searchResult && (
                <SearchResultWrapper>
                  {searchResult.map(({ id, image, brandName, name }) => (
                    <SearchResult
                      id={id}
                      img={image}
                      brand={brandName}
                      name={name}
                      setPerfumeInfo={setPerfumeInfo}
                      setSearchResult={setSearchResult}
                      key={id}
                    />
                  ))}
                </SearchResultWrapper>
              )}

              <ModalSpan size="0.75rem" margin="1.5rem 0 0.5rem 0">
                {perfumeInfo?.brandName}
              </ModalSpan>
              <FlexDiv justify="space-between" height="auto">
                <ModalSpan bold={true}>{perfumeInfo?.name}</ModalSpan>
                {perfumeInfo && newTypeIdx !== 2 ? (
                  <StarRating
                    size="1rem"
                    starValue={perfumeInfo.preference}
                    setStarValue={setPerfumeInfo}
                    setErrorMsg={setErrorMsg}
                    isSearch={true}
                  />
                ) : (
                  <></>
                )}
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
          <ModalSpan
            bold={true}
            color="main"
            size="3.5rem"
            margin="3.5rem 0 1.5rem 0"
          >
            {textArr[newTypeIdx].toUpperCase()}
          </ModalSpan>
          <CheckboxPickOne
            textArr={textArr}
            pickedIdx={newTypeIdx}
            setPickedIdx={setNewTypeIdx}
            width="70%"
            height="auto"
          />
          {newTypeIdx !== 2 && (
            <ModalReview
              placeholder="다른 사람들을 위해 후기를 남겨주세요"
              onChange={(e) =>
                setPerfumeInfo((prev) => ({ ...prev, review: e.target.value }))
              }
            ></ModalReview>
          )}
          <ModalSubmit onClick={() => fetchPerfumeToList()}>
            {modalType === "modify" ? "수정하기" : "추가하기"}
          </ModalSubmit>

          {errorMsg && <ModalErrorMsg>{errorMsg}</ModalErrorMsg>}
        </ModalContent>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default SearchModal;
