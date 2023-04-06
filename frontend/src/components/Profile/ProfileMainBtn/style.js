import styled, { css, keyframes } from "styled-components";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";

const steam = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
`;

const ProfileMainBtnWrapper = styled(FlexDiv)`
  width: calc(100% / 3);
  height: calc(100vh - var(--nav-height));
  padding: 0;
  background-image: url("/assets/images/bgimg${(props) => props.bgimgNo}.png");
  background-size: cover;
`;

// colors
// #fb0094 megenta
// #0000ff blue
// #fcba03 orange
// #ffff00 yellow
// #ff0000 red
const ProfileMainBtnDiv = styled(FlexDiv)`
  width: 15rem;
  height: 15rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  position: relative;

  &:hover:after {
    content: "";
    position: absolute;
    left: -2px;
    top: -2px;
    background: linear-gradient(
      45deg,
      #fb0094,
      #0000ff,
      #fcba03,
      #ffff00,
      #ff0000,
      #fb0094,
      #0000ff,
      #fcba03,
      #ffff00,
      #ff0000
    );
    background-size: 400%;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    filter: blur(50px);
    animation: ${steam} 25s linear infinite;
  }
  &:hover:before {
    content: "";
    width: 15rem;
    height: 15rem;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 1;
  }
`;

const ProfileMainBtnSpan = styled.span`
  ${({ isTitle }) => css`
    font-size: ${isTitle ? "2.1rem" : "1.1rem"};
    z-index: 2;
  `}
`;

export { ProfileMainBtnWrapper, ProfileMainBtnDiv, ProfileMainBtnSpan };

// HTML
// <div class="block"></block>

// CSS
// body {
// 	margin: 0;
// 	padding: 0;
// 	background-color: #000;
// }

// .block {
// 	position: relative;
// 	margin: 300px auto 0;
// 	width: 500px;
// 	height: 250px;
// 	background: linear-gradient(0deg, #000, #272727);
// }

// .block:before, .block:after {
// 	content: '';
// 	position: absolute;
// 	left: -2px;
// 	top: -2px;
// 	background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00,#ffff00, #ff0000, #fb0094,
// 		#0000ff, #00ff00,#ffff00, #ff0000);
// 	background-size: 400%;
// 	width: calc(100% + 4px);
// 	height: calc(100% + 4px);
// 	z-index: -1;
// 	animation: steam 20s linear infinite;
// }

// @keyframes steam {
// 	0% {
// 		background-position: 0 0;
// 	}
// 	50% {
// 		background-position: 400% 0;
// 	}
// 	100% {
// 		background-position: 0 0;
// 	}
// }

// .block:after {
// 	filter: blur(50px);
// }
