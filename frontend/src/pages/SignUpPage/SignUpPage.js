import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/userSlice";
import api from "../../apis/api";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import "dayjs/locale/ko";
import CheckboxWithIcon from "../../components/common/CheckboxWithIcon/CheckboxWithIcon";
import CheckboxPickOne from "../../components/common/CheckboxPickOne/CheckboxPickOne";
import { FlexDiv } from "../../components/common/FlexDiv/FlexDiv";
import { TitleSpan } from "../LogInPage/style";
import { SignUpInput, SignUpItemWrapper, SignUpMsg, SignUpSpan } from "./style";
import Toggle from "../../components/common/Toggle/Toggle";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
// dayjs.locale("ko");

const SignUpPage = () => {
  /*
   * Hooks
   */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, type } = useLocation().state;

  // 값 저장할 state
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [genderPickedIdx, setGenderPickedIdx] = useState(null);

  // validation 관련 state
  const [nameChecked, setNameChecked] = useState(false);
  const [birthOpen, setBirthOpen] = useState(true);
  const [genderOpen, setGenderOpen] = useState(true);
  const [nameMsg, setNameMsg] = useState("10자 이하의 닉네임을 입력해주세요");
  const [birthMsg, setBirthMsg] = useState(
    "YYYYMMDD 형식의 8자리로 입력해주세요"
  );
  const [genderMsg, setGenderMsg] = useState(" ");
  const [isError, setIsError] = useState({
    name: false,
    birth: false,
    gender: false,
  });

  /*
   * Functions
   */

  // 닉네임 중복검사 요청
  const fetchCheckName = async () => {
    const res = await api.user.checkName(name);

    if (res.possible) {
      setNameChecked(true);
      setIsError((prev) => {
        return { ...prev, name: false };
      });
      setNameMsg("");
    } else {
      setIsError((prev) => {
        return { ...prev, name: true };
      });
      setNameMsg("사용할 수 없는 닉네임입니다");
    }
  };

  // 회원가입 요청
  const fetchPostMemberInfo = async () => {
    if (!name) {
      setIsError((prev) => {
        return { ...prev, name: true };
      });
      setNameMsg("닉네임을 입력해주세요");
    } else if (!nameChecked) {
      setIsError((prev) => {
        return { ...prev, name: true };
      });
      setNameMsg("닉네임 중복체크를 완료해주세요");
    } else if (!birth) {
      setIsError((prev) => {
        return { ...prev, birth: true };
      });
      setBirthMsg("생년월일을 입력해주세요");
    } else if (birth.length < 8) {
      setIsError((prev) => {
        return { ...prev, birth: true };
      });
      setBirthMsg("유효하지 않은 생년월일입니다");
    } else if (genderPickedIdx === null) {
      setIsError((prev) => {
        return { ...prev, gender: true };
      });
      setGenderMsg("성별을 선택해주세요");
    } else {
      const res = await api.user.register({
        email: email,
        type: type,
        nickname: name,
        birth: dayjs(birth).format("YYYY-MM-DD"),
        birthOpen: birthOpen ? 1 : 0,
        gender: genderPickedIdx,
        genderOpen: genderOpen ? 1 : 0,
        alarmOpen: 1,
      });

      //web socket 연결
      // dispatch({ type: "START_WEBSOCKET" });

      // accessToken 리덕스에 저장
      dispatch(login({ accessToken: res.accessToken, nickname: res.nickname }));

      // 홈으로 이동
      navigate("/");
      // navigate(-1, { replace: true });
    }
  };

  // 생년월일 형식 유효성 검사
  useEffect(() => {
    if (birth.length === 8) {
      const year = +birth.slice(0, 4);
      const month = +birth.slice(4, 6);
      const day = +birth.slice(6, 8);

      if (
        !dayjs(birth, "YYYYMMDD", true).isValid() || // isValid가 false거나
        dayjs(birth).toDate() > new Date() || // 오늘 이후 날짜이거나
        year < dayjs().year() - 100 || // 오늘 기준 100년보다 더 이전이거나
        month > 12 || // month값이 12를 초과하거나
        (month === 2 && day > 29) || // 2월인데 29일 초과이거나
        ([4, 6, 9, 11].includes(month) && day > 30) || // 4,6,9,11월인데 30일 초과이거나
        day > 31 // day값이 31을 초과할 경우
      ) {
        setBirthMsg("유효하지 않은 생년월일입니다");
        setIsError((prev) => {
          return { ...prev, birth: true };
        });
      } else {
        setBirthMsg(" ");
        setIsError((prev) => {
          return { ...prev, birth: false };
        });
      }
    } else
      setIsError((prev) => {
        return { ...prev, birth: false };
      });
  }, [birth]);

  useEffect(() => {
    setIsError((prev) => {
      return { ...prev, gender: false };
    });
    setGenderMsg(" ");
  }, [genderPickedIdx]);

  return (
    <FlexDiv height="100vh">
      <FlexDiv
        direction="column"
        width="45%"
        style={{
          backgroundImage: "url('/assets/images/bgimg1.png')",
          backgroundSize: "cover",
        }}
      >
        <TitleSpan>In</TitleSpan>
        <TitleSpan>Cense</TitleSpan>
      </FlexDiv>
      <FlexDiv direction="column">
        <FlexDiv direction="column" height="35%">
          <SignUpSpan>보다 정확한 추천을 위해</SignUpSpan>
          <SignUpSpan>당신에 대해 알려주세요</SignUpSpan>
        </FlexDiv>
        <div style={{ height: "45%" }}>
          <FlexDiv
            direction="column"
            justify="start"
            align="start"
            height="auto"
          >
            <SignUpItemWrapper>
              <FlexDiv direction="column" align="start" width="auto">
                <SignUpInput
                  placeholder="닉네임을 입력해주세요"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    // 입력한 닉네임이 바뀌면 중복검사 해제
                    setNameChecked(false);
                    setIsError((prev) => {
                      return { ...prev, name: false };
                    });
                    // 길이 유효성 검사
                    if (e.target.value.length <= 10) {
                      setName(e.target.value);
                      setNameMsg("10자 이하의 닉네임을 입력해주세요");
                    } else {
                      setName(name.substring(0, 10));
                    }
                  }}
                  required
                  maxlength={10}
                />
                <SignUpMsg color={isError.name ? "red" : null}>
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
            </SignUpItemWrapper>

            <SignUpItemWrapper>
              <FlexDiv direction="column" align="start" width="auto">
                <SignUpInput
                  placeholder="생년월일을 입력해주세요"
                  value={birth}
                  onChange={(e) => {
                    // 길이 유효성 검사
                    if (e.target.value.length <= 8) {
                      setBirth(e.target.value);
                      setBirthMsg("YYYYMMDD 형식의 8자리로 입력해주세요");
                    } else {
                      setBirth(birth.substring(0, 8));
                    }
                  }}
                  msgColor={isError.birth ? "red" : null}
                  type="number"
                  required
                />
                <SignUpMsg color={isError.birth ? "red" : null}>
                  {birthMsg}
                </SignUpMsg>
              </FlexDiv>
              <Toggle
                id="birthToggle"
                checked={birthOpen}
                setChecked={setBirthOpen}
              />
            </SignUpItemWrapper>

            <SignUpItemWrapper>
              <FlexDiv direction="column" align="start" width="auto">
                <CheckboxPickOne
                  textArr={["남성", "여성"]}
                  pickedIdx={genderPickedIdx}
                  setPickedIdx={setGenderPickedIdx}
                  width="23rem"
                  height="3rem"
                  margin="0 3rem 0 0"
                />
                <SignUpMsg color={isError.gender ? "red" : null}>
                  {genderMsg}
                </SignUpMsg>
              </FlexDiv>
              <Toggle
                id="genderToggle"
                checked={genderOpen}
                setChecked={setGenderOpen}
                padding="0 0 1.25rem 0"
              />
            </SignUpItemWrapper>
          </FlexDiv>
        </div>
        <div style={{ height: "20%" }}>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              fetchPostMemberInfo();
            }}
          >
            완료
          </button>
        </div>
      </FlexDiv>
    </FlexDiv>
  );
};

export default SignUpPage;
