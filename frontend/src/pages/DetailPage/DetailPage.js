import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
// import BellIcon from './bell1.svg'
import { BsBell } from "react-icons/bs";
import { BsFillBellFill } from "react-icons/bs";
import { Button } from "@mui/material";
// import CardComponent from "../ListPage/CardComponent";
import CardComponent2 from "./CardComponent2";
import DivideLine from "../../components/common/DivideLine/DivideLine";
import ReviewTable from "./ReviewTable";
import { useNavigate, useParams } from "react-router";
import CheckStatus from "./CheckStatus";
import CheckModal from "./CheckModal";
import { useDispatch, useSelector } from "react-redux";
import api from "../../apis/api";
import { perfumeInfoActions } from "../../store/slice/perfumeInfoSlice";
import { similarListActions } from "../../store/slice/similarListSlice";
import { similarityActions } from "../../store/slice/similaritySlice";
// import { login, logout } from "../../store/slice/userSlice";

const DetailPage = () => {
  const [alarmStatus, setAlarmStatus] = useState(0);
  const isLoggedIn = useSelector((state) => {
    // console.log('state==',state)
    return state.userReducers.isLoggedIn;
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const params = useParams();
  const detailId = params.detailId;

  useEffect(() => {
    api.image
      .getImage(fileName)
      .then((res) => {})
      .catch((err) => {});
    api.list
      .getDetail(detailId)
      .then((res) => {
        dispatch(perfumeInfoActions.getPerfumeInfo(res));
      })
      .catch((err) => {
        alert(err);
      });

    api.list.getSimilarList(detailId).then((res) => {
      dispatch(similarListActions.getSimilarList(res));
    });
  }, [alarmStatus, detailId]);

  const perfumeInfo = useSelector((state) => {
    return state.perfumeInfoReducers.perfumeInfo;
  });
  console.log("perfumeinfo", perfumeInfo);
  const category = useSelector((state) => {
    return state.perfumeInfoReducers.category;
  });
  const similarList = useSelector((state) => {
    return state.similarListReducers.similarList;
  });
  const similarity = useSelector((state) => {
    return state.similarityReducers.similarity;
  });
  const favNotes = similarity.favNotes;
  const worNotes = similarity.worNotes;
  const predictRate = similarity.predictRate;
  const fileName = perfumeInfo?.image;

  useEffect(() => {
    if (isLoggedIn === true) {
      api.analysis.getSimilarity(detailId).then((res) => {
        dispatch(similarityActions.getSimilarity(res));
      });
      api.alarm.getAlarm(detailId).then((res) => {
        setAlarmStatus(res);
        console.log("알람?", res);
      });
    }
    api.list.getCategory(detailId).then((res) => {
      dispatch(perfumeInfoActions.getCategory(res.category));
    });
  }, [alarmStatus, detailId]);

  // 알람 설정
  const onChangeAlarm = () => {
    if (isLoggedIn === true) {
      if (alarmStatus === 0) {
        setAlarmStatus(1);
        api.alarm.setAlarm(detailId);
        // console.log('알람on')
      } else if (alarmStatus === 1) {
        setAlarmStatus(0);
        api.alarm.resetAlarm(detailId);
        // console.log('알람off')
      }
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  // 유사도 보여주기 설정
  const [showSimilarity, setShowSimilarity] = useState(false);
  const onClickButton = () => {
    if (isLoggedIn === true) {
      setShowSimilarity(true);
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  // had/have/want 설정
  const [typeIdx, setTypeIdx] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => {
    if (isLoggedIn === true) {
      setIsOpen(true);
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  if (!perfumeInfo) return null;

  return (
    <Box
      sx={{
        marginBottom: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "#D9D9D9",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "3rem",
        }}
      >
        {/* <h4>DETAIL</h4> */}
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          // backgroundColor:"#FBE8E8",
          my: "3rem",
        }}
      >
        <Box
          sx={{
            width: "40rem",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            marginRight: "8rem",
          }}
        >
          {/* <h1>이미지 자리</h1> */}
          <Box
            sx={{
              width: "25rem",
              height: "25rem",
              border: "1px solid lightgrey",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              position: "relative",
            }}
          >
            {alarmStatus === 0 ? (
              <BsBell
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "1rem",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
                onClick={onChangeAlarm}
              ></BsBell>
            ) : (
              <BsFillBellFill
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "1rem",
                  fontSize: "2rem",
                  color: "#706DFF",
                  cursor: "pointer",
                }}
                onClick={onChangeAlarm}
              ></BsFillBellFill>
            )}
            <img
              style={{
                width: "auto",
                height: "20rem",
                position: "relative",
                top: "2.5rem",
              }}
              src={`https://j8a804.p.ssafy.io/api/display?filename=${fileName}`}
              alt="detailimage"
            ></img>
          </Box>
          <Box sx={{ width: "25rem", height: "5rem" }}>
            <CheckStatus
              onClickModal={onClickModal}
              textArr={["I had it", "I have it", "I want it"]}
              pickedIdx={typeIdx}
              setPickedIdx={setTypeIdx}
              width="100%"
              padding="0 5%"
              color="dark-gray"
              isOpen={isOpen}
              category={category}
              setIsOpen={setIsOpen}
            />

            {isOpen && (
              <CheckModal
                open={isOpen}
                setIsOpen={setIsOpen}
                imageURL={`https://j8a804.p.ssafy.io/api/display?filename=${fileName}`}
                onClose={() => {
                  setIsOpen(false);
                }}
                idx={typeIdx}
                perfumeInfo={perfumeInfo}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "40rem",
            display: "flex",
            flexDirection: "column",
            marginLeft: "8rem",
          }}
        >
          {/* <h1>설명 자리</h1> */}
          <p>{perfumeInfo.brandName}</p>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginTop: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            {perfumeInfo.name}
          </p>
          <ul>
            <li
              style={{
                fontWeight: "bold",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              Top Note &nbsp;:&nbsp; {perfumeInfo.topNoteName.join(", ")}{" "}
            </li>
            <li
              style={{
                fontWeight: "bold",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              Middle Note &nbsp;:&nbsp; {perfumeInfo.middleNoteName.join(", ")}
            </li>
            <li
              style={{
                fontWeight: "bold",
                marginTop: "1rem",
                marginBottom: "5rem",
              }}
            >
              Base Note &nbsp;:&nbsp; {perfumeInfo.baseNoteName.join(", ")}
            </li>
          </ul>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginTop: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            내 취향과의 유사도 : &nbsp;
            {showSimilarity === false ? (
              <Button
                onClick={onClickButton}
                sx={{ fontWeight: "bold" }}
                variant="outlined"
              >
                {" "}
                확인하기{" "}
              </Button>
            ) : (
              <>{predictRate * 20}%</>
            )}
          </p>

          {showSimilarity === true ? (
            <div>
              <p
                style={{
                  fontWeight: "bold",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                - 이런 점이 내 취향과 비슷해요
              </p>
              {/* {Array.isArray(favNotes) &&
            favNotes.length > 0 &&
            favNotes.map((note, index) => {
              return <p>Diptyque &nbsp; 시트러스향 &nbsp; 높은 부향률</p>
            })} */}
              <p>{favNotes.join(", ")}</p>
              <p
                style={{
                  fontWeight: "bold",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                - 이런 점이 내 취향과 달라요
              </p>
              <p>{worNotes.join(", ")}</p>
            </div>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <DivideLine />
      <Box sx={{ width: "80rem", display: "flex" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          유사한 향수 목록
        </h1>
      </Box>
      <Box
        sx={{
          width: "80rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        {Array.isArray(similarList) &&
          similarList.length > 0 &&
          similarList.map((perfume, index) => {
            return <CardComponent2 key={index} perfume={perfume} />;
          })}
      </Box>
      <DivideLine />
      <Box sx={{ width: "80rem", display: "flex", flexDirection: "column" }}>
        {/* <h1 style={{fontSize:'2rem', fontWeight:'bold', marginTop:'2rem', marginBottom:'3rem'}}>후기 (28)</h1> */}
        <ReviewTable perfumeInfo={perfumeInfo} detailId={detailId} />
      </Box>
    </Box>
  );
};

export default DetailPage;
