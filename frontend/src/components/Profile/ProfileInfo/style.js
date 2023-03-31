import styled from "styled-components";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const ProfileInfoWrapper = styled(FlexDiv)`
  width: 12.5rem;
  position: fixed;
  top: var(--nav-height);
  left: 0;
  box-shadow: 6px 10px 10px rgba(0, 0, 0, 0.25);
`;

const ProfileImg = styled.img.attrs((props) => ({
  src:
    `https://j8a804.p.ssafy.io/api/display?filename=${props.src}` ||
    "/assets/images/profile-default.png",
}))`
  width: 10rem;
  height: 10rem;
  border-radius: 5px;
`;

const ProfileGrade = styled.img.attrs((props) => ({
  src: `/assets/icons/grade${props.grade}.svg`,
}))`
  padding-left: 1.25rem;
`;

const ProfileInfoSpan = styled.span`
  font-size: 0.75rem;
  padding-left: 0.5rem;
  font-weight: ${(props) => (props.bold ? "700" : "400")};
`;

export { ProfileInfoWrapper, ProfileImg, ProfileGrade, ProfileInfoSpan };
