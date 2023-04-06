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
  fetchGetUserInfo,
}) => {
  /*
   * Hooks
   */
  const ref = useRef();
  useModal(ref, () => {
    setModalOpen(false);
  });

  // 수정할 상태 관리용 state
  const imgRef = useRef();
  const [profile, setProfile] = useState(
    `https://j8a804.p.ssafy.io/api/display?filename=${img}`
  );
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

  // 업로드한 이미지 보여주기
  const showChosenImage = () => {
    const file = imgRef.current.files[0];

    if (file.size > 1024 * 1024) {
      alert("1MB 이하의 이미지만 사용 가능합니다");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfile(reader.result);
    };
  };

  // 프로필 수정 요청
  const fetchModifyProfile = async () => {
    if (!newName) {
      setIsError(true);
      setNameMsg("닉네임을 입력해주세요");
    } else if (name !== newName && !nameChecked) {
      setIsError(true);
      setNameMsg("닉네임 중복체크를 완료해주세요");
    } else {
      // 프로필사진 외 정보 수정
      await api.user.putUserInfo({
        nickname: newName,
        birthOpen: newBirthOpen ? 1 : 0,
        genderOpen: newGenderOpen ? 1 : 0,
        alarmOpen: newAlarmOpen ? 1 : 0,
      });

      // 프로필 사진 수정
      if (imgRef.current.files.length) {
        const formData = new FormData();
        formData.append("image", imgRef.current.files[0]);
        await api.user.putUserProfileImg(formData);
      }

      setModalOpen(false);
      fetchGetUserInfo();
    }
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
                <img src={profile} alt="profile" style={{ height: "10rem" }} />
                <label>
                  <input
                    type="file"
                    accept=".jpeg, .png"
                    ref={imgRef}
                    onChange={showChosenImage}
                    style={{ display: "none" }}
                  />
                  <ModalSpan margin="0.5rem" pointer={true} color="dark-gray">
                    프로필사진 변경
                  </ModalSpan>
                </label>
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
