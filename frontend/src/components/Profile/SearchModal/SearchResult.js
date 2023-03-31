import React from "react";
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
      <ModalImg src={img} alt="perfume" height="3.5rem" />
      <ModalSpan size="0.75rem" margin="1.5rem 0 0.5rem 0">
        {brand}
      </ModalSpan>
      <ModalSpan bold={true}>{name}</ModalSpan>
    </SearchResultItem>
  );
};

export default SearchResult;
