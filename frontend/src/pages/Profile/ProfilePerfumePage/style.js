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

export {
  ProfilePerfumeHeader,
  ProfilePerfumeHeaderSpan,
  ProfilePerfumeContentContainer,
};
