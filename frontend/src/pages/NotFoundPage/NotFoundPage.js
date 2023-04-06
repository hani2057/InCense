import React from "react";
import {
  NotFoundContainer,
  NotFoundWrapper,
  SceneDiv,
  NotFoundItemWrapper,
  NotFoundCircle,
  NotFoundItemP,
  NotFoundContent,
  NotFoundSpan,
  GoToHomeWrapper,
  GoToHomeBtm,
} from "./style";

const NotFoundPage = () => {
  return (
    <NotFoundContainer class="wrapper">
      <NotFoundWrapper class="container">
        <SceneDiv id="scene" class="scene" data-hover-only="false">
          <NotFoundCircle class="circle" data-depth="1.2"></NotFoundCircle>

          <NotFoundItemWrapper class="one" data-depth="0.9">
            <NotFoundContent class="content">
              <NotFoundSpan class="piece"></NotFoundSpan>
              <NotFoundSpan class="piece"></NotFoundSpan>
              <NotFoundSpan class="piece"></NotFoundSpan>
            </NotFoundContent>
          </NotFoundItemWrapper>

          <NotFoundItemWrapper class="two" data-depth="0.60">
            <NotFoundContent class="content">
              <spNotFoundSpanan class="piece"></spNotFoundSpanan>
              <NotFoundSpan class="piece"></NotFoundSpan>
              <NotFoundSpan class="piece"></NotFoundSpan>
            </NotFoundContent>
          </NotFoundItemWrapper>

          <NotFoundItemWrapper class="three" data-depth="0.40">
            <NotFoundContent class="content">
              <NotFoundSpan class="piece"></NotFoundSpan>
              <NotFoundSpan class="piece"></NotFoundSpan>
              <NotFoundSpan class="piece"></NotFoundSpan>
            </NotFoundContent>
          </NotFoundItemWrapper>

          <NotFoundItemP class="p404" data-depth="0.50">
            404
          </NotFoundItemP>
          <NotFoundItemP class="p404" data-depth="0.10">
            404
          </NotFoundItemP>
        </SceneDiv>

        <GoToHomeWrapper class="text">
          <GoToHomeBtm>Go to Home!</GoToHomeBtm>
        </GoToHomeWrapper>
      </NotFoundWrapper>
    </NotFoundContainer>
  );
};

export default NotFoundPage;

// HTML
// <!-- about -->
// <div class="about">
//    <a class="bg_links social portfolio" href="https://www.rafaelalucas.com" target="_blank">
//       <span class="icon"></span>
//    </a>
//    <a class="bg_links social dribbble" href="https://dribbble.com/rafaelalucas" target="_blank">
//       <span class="icon"></span>
//    </a>
//    <a class="bg_links social linkedin" href="https://www.linkedin.com/in/rafaelalucas/" target="_blank">
//       <span class="icon"></span>
//    </a>
//    <a class="bg_links logo"></a>
// </div>
// <!-- end about -->

//     <nav>
//         <div class="menu">
//             <p class="website_name">LOGO</p>
//             <div class="menu_links">
//                 <a href="" class="link">about</a>
//                 <a href="" class="link">projects</a>
//                 <a href="" class="link">contacts</a>
//             </div>
//             <div class="menu_icon">
//                 <span class="icon"></span>
//             </div>
//         </div>
//     </nav>

// SCSS;
// .about {
//   $cubic: cubic-bezier(0.64, 0.01, 0.07, 1.65);
//   $transition: 0.6s $cubic;
//   $size: 40px;
//   position: fixed;
//   z-index: 10;
//   bottom: 10px;
//   right: 10px;
//   width: $size;
//   height: $size;
//   display: flex;
//   justify-content: flex-end;
//   align-items: flex-end;
//   transition: all 0.2s ease;

//   .bg_links {
//      width: $size;
//      height: $size;
//      border-radius: 100%;
//      display: flex;
//      justify-content: center;
//      align-items: center;
//      background-color: rgba(#000000, 0.2);
//      border-radius: 100%;
//      backdrop-filter: blur(5px);
//      position: absolute;
//   }

//   .logo {
//      width: $size;
//      height: $size;
//      z-index: 9;
//      background-image: url(https://rafaelavlucas.github.io/assets/codepen/logo_white.svg);
//      background-size: 50%;
//      background-repeat: no-repeat;
//      background-position: 10px 7px;
//      opacity: 0.9;
//      transition: all 1s 0.2s ease;
//      bottom: 0;
//      right: 0;
//   }

//   .social {
//      opacity: 0;
//      right: 0;
//      bottom: 0;

//      .icon {
//         width: 100%;
//         height: 100%;
//         background-size: 20px;
//         background-repeat: no-repeat;
//         background-position: center;
//         background-color: transparent;
//         display: flex;
//         transition: all 0.2s ease, background-color 0.4s ease;
//         opacity: 0;
//         border-radius: 100%;
//      }

//      &.portfolio {
//         transition: all 0.8s ease;

//         .icon {
//            background-image: url(https://rafaelavlucas.github.io/assets/codepen/link.svg);
//         }
//      }

//      &.dribbble {
//         transition: all 0.3s ease;
//         .icon {
//            background-image: url(https://rafaelavlucas.github.io/assets/codepen/dribbble.svg);
//         }
//      }

//      &.linkedin {
//         transition: all 0.8s ease;
//         .icon {
//            background-image: url(https://rafaelavlucas.github.io/assets/codepen/linkedin.svg);
//         }
//      }
//   }

//   &:hover {
//      width: 105px;
//      height: 105px;
//      transition: all $transition;

//      .logo {
//         opacity: 1;
//         transition: all 0.6s ease;
//      }

//      .social {
//         opacity: 1;

//         .icon {
//            opacity: 0.9;
//         }

//         &:hover {
//            background-size: 28px;
//            .icon {
//               background-size: 65%;
//               opacity: 1;
//            }
//         }

//         &.portfolio {
//            right: 0;
//            bottom: calc(100% - 40px);
//            transition: all 0.3s 0s $cubic;
//            .icon {
//               &:hover {
//                  background-color: #698fb7;
//               }
//            }
//         }

//         &.dribbble {
//            bottom: 45%;
//            right: 45%;
//            transition: all 0.3s 0.15s $cubic;
//            .icon {
//               &:hover {
//                  background-color: #ea4c89;
//               }
//            }
//         }

//         &.linkedin {
//            bottom: 0;
//            right: calc(100% - 40px);
//            transition: all 0.3s 0.25s $cubic;
//            .icon {
//               &:hover {
//                  background-color: #0077b5;
//               }
//            }
//         }
//      }
//   }
// }
