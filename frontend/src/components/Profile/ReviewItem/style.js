import styled from "styled-components";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const ReviewItemWrapper = styled(FlexDiv)`
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
    box-shadow: 0 0 20px -5px var(--pink-sub-color);
  }
  &:hover .changeColorWhenHover {
    color: var(--pink-main-color);
  }
`;

export { ReviewItemWrapper };
