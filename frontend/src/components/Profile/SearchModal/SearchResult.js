import React from "react";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import { SearchResultItem, ModalImg, ModalSpan } from "./style";

const SearchResult = ({
  id,
  img,
  brand,
  name,
  setPerfumeInfo,
  setSearchResult,
}) => {
  return (
    <SearchResultItem
      onClick={() => {
        setPerfumeInfo({ id: id, image: img, name: name, brandName: brand });
        setSearchResult(null);
      }}
    >
      <div style={{ width: "20%" }}>
        <ModalImg src={img} alt="perfume" height="3.5rem" />
      </div>
      <FlexDiv direction="column" width="auto" align="start">
        <ModalSpan size="0.75rem" margin="0 0 0.2rem 0" pointer={true}>
          {brand}
        </ModalSpan>
        <ModalSpan bold={true} pointer={true}>
          {name}
        </ModalSpan>
      </FlexDiv>
    </SearchResultItem>
  );
};

export default SearchResult;
