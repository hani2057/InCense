import styled, { keyframes } from "styled-components";

const content = keyframes`
  0% {
    width: 0;
  }
}
`;

const pieceLeft = keyframes`
  0% {}
  50% {
      left: 80%;
      width: 10%;
  }
  100% {}
`;

const pieceRight = keyframes`
  0% {}
  50% {
      right: 80%;
      width: 10%;
  }
  100% {}
`;

const anime404 = keyframes` 
  0% {
    opacity: 0;
    transform: scale(10) skew(20deg, 20deg);
  }
`;

const circle = keyframes`
  0% {
    width: 0;
    height: 0;
  }
`;

const NotFoundContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow-x: hidden;
  background: #695681;
`;

const NotFoundWrapper = styled.div`
  margin: 0 auto;
  transition: all 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SceneDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  vertical-align: middle;
`;

const NotFoundItemWrapper = styled.div`
  width: 60%;
  height: 60%;
  top: 20% !important;
  left: 20% !important;
  min-width: 400px;
  min-height: 400px;
`;

const NotFoundCircle = styled(NotFoundItemWrapper)`
  position: absolute;

  &:before {
    content: "";
    position: absolute;
    width: 800px;
    height: 800px;
    background-color: rgba($bg-02, 0.2);
    border-radius: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: inset 5px 20px 40px rgba($bg-02, 0.25),
      inset 5px 0px 5px rgba($bg-03, 0.3), inset 5px 5px 20px rgba($bg-03, 0.25),
      2px 2px 5px rgba(white, 0.2);
    animation: ${circle} 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;
  }
`;

const NotFoundItemP = styled.p`
  width: 60%;
  height: 60%;
  top: 20% !important;
  left: 20% !important;
  min-width: 400px;
  min-height: 400px;
  font-size: 200px;
  font-weight: 700;
  letter-spacing: 4px;
  color: white;
  display: flex !important;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  animation: ${anime404} 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
  animation-delay: 1.2s;

  &:nth-of-type(2) {
    color: #36184f;
    z-index: 1;
    animation-delay: 1s;
    filter: blur(10px);
    opacity: 0.8;
  }
`;

const NotFoundContent = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${content} 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;
`;

const NotFoundSpan = styled.span`
  width: 200px;
  height: 80px;
  display: flex;
  position: absolute;
  border-radius: 80px;
  z-index: 1;

  animation: ${pieceLeft} 8s cubic-bezier(1, 0.06, 0.25, 1) infinite both;
`;

const GoToHomeWrapper = styled.div`
  width: 60%;
  height: 40%;
  min-width: 400px;
  min-height: 500px;
  position: absolute;
  margin: 40px 0;
  animation: text 0.6s 1.8s ease backwards;

  @keyframes text {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
  }
`;
const GoToHomeBtm = styled.button`
  height: 40px;
  padding: 0 30px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0px 15px 20px rgba($bg-02, 0.5);
  z-index: 3;
  color: $bg-01;
  background-color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 10px 10px -10px rgba($bg-02, 0.5);
    transform: translateY(5px);
    background: #fb8a8a;
    color: white;
  }
`;

export {
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
};
