import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import useModal from "../../../hooks/useModal";
import api from "../../../apis/api";
import CheckboxWithIcon from "../../common/CheckboxWithIcon/CheckboxWithIcon";
import Toggle from "../../common/Toggle/Toggle";
import { FlexDiv } from "../../common/FlexDiv/FlexDiv";
import {
  ModalClose,
  ModalContainer,
  ModalContent,
  ModalImg,
  ModalSpan,
  ModalSubmit,
  ModalWrapper,
} from "../SearchModal/style";
import { SignUpInput, SignUpMsg } from "../../../pages/SignUpPage/style";

const ModifyModal = ({
  setModalOpen,
  img,
  name,
  birth,
  birthOpen,
  gender,
  genderOpen,
  alarmOpen,
}) => {
  /*
   * Hooks
   */
  const ref = useRef();
  useModal(ref, () => {
    setModalOpen(false);
  });

  // 수정할 상태 관리용 state
  const [profile, setProfile] = useState(img);
  const [newName, setNewName] = useState(name);
  const [newBirthOpen, setNewBirthOpen] = useState(birthOpen);
  const [newGenderOpen, setNewGenderOpen] = useState(genderOpen);
  const [newAlarmOpen, setNewAlarmOpen] = useState(alarmOpen);

  // validation 관련 state
  const [nameChecked, setNameChecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [nameMsg, setNameMsg] = useState("");

  /*
   * Functions
   */

  // 닉네임 중복검사 요청
  const fetchCheckName = async () => {
    const res = await api.user.checkName(newName);

    if (res.possible) {
      setNameChecked(true);
      setIsError(false);
      setNameMsg("");
    } else {
      setIsError(true);
      setNameMsg("사용할 수 없는 닉네임입니다");
    }
  };

  // 프로필 수정 요청
  const fetchModifyProfile = async () => {
    const data = {
      image: profile,
      nickname: newName,
      birthOpen: newBirthOpen,
      genderOpen: newGenderOpen,
      alarmOpen: newAlarmOpen,
    };
    const res = await api.user.putUserInfo(data);
    console.log(data);
  };

  const ageRange = Math.floor((dayjs().year() - birth[0] + 1) / 10) * 10;

  return (
    <ModalContainer>
      <ModalWrapper ref={ref}>
        <ModalClose ref={ref} onClick={() => setModalOpen(false)}>
          X
        </ModalClose>
        <ModalContent>
          <FlexDiv direction="column" justify="start" padding="0 1rem">
            <FlexDiv height="60%">
              <FlexDiv width="60%" direction="column">
                <ModalImg src={profile} alt="profile" height="10rem" />
                <ModalSpan margin="0.5rem" pointer={true} color="dark-gray">
                  프로필사진 변경
                </ModalSpan>
              </FlexDiv>
              <FlexDiv width="12%" direction="column">
                <FlexDiv justify="start" height="4rem">
                  <ModalSpan>{gender ? "여성" : "남성"}</ModalSpan>
                </FlexDiv>
                <FlexDiv justify="start" height="4rem">
                  <ModalSpan>{`${ageRange}대`}</ModalSpan>
                </FlexDiv>
                <FlexDiv justify="start" height="4rem">
                  <ModalSpan>알람</ModalSpan>
                </FlexDiv>
              </FlexDiv>
              <FlexDiv width="28%" direction="column">
                <FlexDiv justify="start" height="4rem">
                  <Toggle
                    id="genderToggle"
                    checked={newGenderOpen}
                    setChecked={setNewGenderOpen}
                    width="auto"
                    height="4rem"
                  />
                </FlexDiv>
                <FlexDiv justify="start" height="4rem">
                  <Toggle
                    id="birthToggle"
                    checked={newBirthOpen}
                    setChecked={setNewBirthOpen}
                    width="auto"
                  />
                </FlexDiv>
                <FlexDiv justify="start" height="4rem">
                  <Toggle
                    id="alarmToggle"
                    checked={newAlarmOpen}
                    setChecked={setNewAlarmOpen}
                    msgChecked="받음"
                    msgUnchecked="받지 않음"
                    width="auto"
                  />
                </FlexDiv>
              </FlexDiv>
            </FlexDiv>

            <FlexDiv
              direction="column"
              justify="start"
              align="start"
              height="20%"
            >
              <FlexDiv justify="space-between">
                <FlexDiv direction="column" align="start" width="auto">
                  <SignUpInput
                    modify={true}
                    placeholder="닉네임을 입력해주세요"
                    type="text"
                    value={newName}
                    onChange={(e) => {
                      // 입력한 닉네임이 바뀌면 중복검사 해제
                      setNameChecked(false);
                      setIsError(false);
                      // 길이 유효성 검사
                      if (e.target.value.length <= 10) {
                        setNewName(e.target.value);
                        setNameMsg("10자 이하의 닉네임을 입력해주세요");
                      } else {
                        setNewName(newName.substring(0, 10));
                      }
                    }}
                    required
                    maxlength={10}
                  />

                  <SignUpMsg color={isError ? "red" : null}>
                    {nameMsg}
                  </SignUpMsg>
                </FlexDiv>
                <div style={{ width: "6rem" }}>
                  <CheckboxWithIcon
                    text={nameChecked ? "사용가능" : "중복검사"}
                    isChecked={nameChecked ? true : false}
                    funcClicked={() => fetchCheckName()}
                    pointer={true}
                  />
                </div>
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
          <ModalSubmit onClick={() => fetchModifyProfile()}>
            수정하기
          </ModalSubmit>
        </ModalContent>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default ModifyModal;
