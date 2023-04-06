import styled, { css } from "styled-components";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const ShareItemWrapper = styled(FlexDiv)`
  ${({ color }) => css`
    width: 50%;
    height: 14rem;
    border: 1px solid transparent;
    border-image: linear-gradient(
      to right,
      #ffd6f8 0%,
      #fffbd6 50%,
      #e1ffe9 100%
    );
    border-image-slice: 1;

    &:hover {
      box-shadow: 0 0 20px -5px var(--${color ? color : "pink-sub"}-color);
    }
    &:hover .changeColorWhenHover {
      color: var(--${color ? color : "pink-main"}-color);
    }
  `}
`;

const ShareSellType = styled.div`
  ${({ type }) => css`
    width: 2.25rem;
    height: 1.5rem;
    font-size: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid
      ${type === "SALE" ? "var(--main-color)" : "var(--pink-main-color)"};
    color: ${type === "SALE" ? "var(--main-color)" : "var(--pink-main-color)"};
  `}
`;

const ShareItemTable = styled.table`
  border: 1px solid var(--gray-color);
  width: 100%;
  height: 4.5rem;
  margin-top: 1.5rem;
`;

const ShareItemTHead = styled.th`
  border: 1px solid var(--gray-color);
  width: 25%;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.75rem;
`;

const ShareItemTBody = styled.td`
  border: 1px solid var(--gray-color);
  width: 25%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 0.75rem;
`;

export {
  ShareItemWrapper,
  ShareSellType,
  ShareItemTable,
  ShareItemTHead,
  ShareItemTBody,
};
