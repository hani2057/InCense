import styled from "styled-components";
import { FlexDiv } from "../../../components/common/FlexDiv/FlexDiv";

const ProfilePerfumeHeader = styled(FlexDiv)`
  height: 9.5rem;
  background-image: url("/assets/images/bgimg1.png");
  background-position: 0% 70%;
  background-size: cover;
`;

const ProfilePerfumeHeaderSpan = styled.span`
  cursor: pointer;

  &:hover {
    color: var(--main-color);
  }
`;

const ProfilePerfumeContentContainer = styled(FlexDiv)`
  & > * {
    align-self: flex-start;
  }
`;

const ProfilePerfumeItemWrapper = styled(FlexDiv)`
  position: relative;
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
`;

export {
  ProfilePerfumeHeader,
  ProfilePerfumeHeaderSpan,
  ProfilePerfumeContentContainer,
  ProfilePerfumeItemWrapper,
};
