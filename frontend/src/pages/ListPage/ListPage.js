import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import CardComponent from "./CardComponent";
// import { Link } from "react-router-dom";
import ToggleFilter from "./ToggleFilter";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import "../../components/common/Dropdown/Dropdown.css";
import { useState } from "react";
import Checkbox from "../../components/common/select/Checkbox111";
import CheckboxGroup from "../../components/common/select/CheckboxGroup";
import Pagination from "../../components/common/Pagination/Pagination";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { perfumeInfoActions } from "../../store/slice/perfumeInfoSlice";
import api from "../../apis/api";
import { perfumeListActions } from "../../store/slice/perfumeListSlice";
import { alarmSliceReducer } from "../../store/slice/alarmSlice";
import { login, logout } from "../../store/slice/userSlice";

const ListPage = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [dropdown2Visibility, setDropdown2Visibility] = useState(false);
  const [dropdown3Visibility, setDropdown3Visibility] = useState(false);

  const [checklist, setChecklist] = useState([]);
  const [checklist2, setChecklist2] = useState([]);
  const [checklist3, setChecklist3] = useState([]);
  // const totalCheck = {brand:checklist, scent:checklist2, concentration: checklist3, }

  // 페이지네이션
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const dispatch = useDispatch();
  useEffect(() => {
    // var roomName = "roomA";
    // var roomId = 1;
    // var username = "hwangyu";
    // console.log(roomName + ", " + roomId + ", " + username);
    // var sockJs = new SockJS("http://localhost:8080/api/stomp/chat");
    // //1. SockJS를 내부에 들고있는 stomp를 내어줌
    // var stomp = Stomp.over(sockJs);
    // //2. connection이 맺어지면 실행
    // stomp.connect({}, function () {
    //   console.log("STOMP Connection");
    //   //4. subscribe(path, callback)으로 메세지를 받을 수 있음
    //   stomp.subscribe("/sub/notification/" + roomId, function (chat) {
    //     console.log("chat!!!!");
    //     console.log(chat);
    //   });
    // });
    // const userInfo = await api.user.getInfo();
    // console.log(userInfo.nickname);
    // websocket.connect(userInfo.nickname, dispatch, alarmSliceReducer);
  }, []);
  useEffect(() => {
    api.list
      .getList(page)
      .then((res) => {
        dispatch(perfumeListActions.getPerfumeList(res));
      })

      .catch((err) => {
        alert(err);
      });
  }, []);

  const perfumeList = useSelector((state) => {
    return state.perfumeListReducers.perfumeList;
  });
  // 리스트는 perfumeList.content로 접근해야함

  const applyFilter = (curretnPage) => {
    api.list
      .getFilteredList(curretnPage, checklist, checklist2, checklist3)
      .then((res) => {
        dispatch(perfumeListActions.getPerfumeList(res));
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Box sx={{ marginBottom: "5rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "#D9D9D9",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "20rem",
            height: "100vh",
            marginLeft: "5rem",
            mt: "10rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            // backgroundColor: "#FBE8E8",
            textAlign: "start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "10rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h1 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>브랜드</h1>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                float: "right",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
            >
              {dropdownVisibility ? "-" : "+"}
            </span>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Dropdown visibility={dropdownVisibility}>
              <ul>
                <CheckboxGroup values={checklist} onChange={setChecklist}>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                      fontSize: "1rem",
                      height: "15rem",
                      justifyContent: "space-around",
                    }}
                  >
                    <Checkbox value={54}> Calvin Klein </Checkbox>
                    <Checkbox value={24}> BERBERRY </Checkbox>
                    <Checkbox value={90}> HUGO BOSS </Checkbox>
                    <Checkbox value={141}> Roberto Cavalli </Checkbox>
                    <Checkbox value={137}> DORALL COLLECTION </Checkbox>
                    <Checkbox value={118}> VERSACE </Checkbox>
                    <Checkbox value={-1}> 기타 </Checkbox>
                  </Box>
                </CheckboxGroup>
              </ul>
            </Dropdown>

            {/* <footer>{checklist.join(',')} 선택</footer> */}
          </Box>
          <Box
            sx={{
              width: "10rem",
              height: "0.2rem",
              backgroundColor: "#DCDCDC",
              marginTop: "0rem",
              marginBottom: "1rem",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "10rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h1 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>향</h1>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                float: "right",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={(e) => setDropdown2Visibility(!dropdown2Visibility)}
            >
              {dropdown2Visibility ? "-" : "+"}
            </span>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Dropdown visibility={dropdown2Visibility}>
              <ul>
                <CheckboxGroup values={checklist2} onChange={setChecklist2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "1.2rem",
                      height: "15rem",
                      justifyContent: "space-around",
                    }}
                  >
                    <Checkbox value={8}> floral </Checkbox>
                    <Checkbox value={2}> woody </Checkbox>
                    <Checkbox value={6}> spicy </Checkbox>
                    <Checkbox value={5}> citrus </Checkbox>
                    <Checkbox value={11}> fruity </Checkbox>
                    <Checkbox value={9}> arabian </Checkbox>
                    <Checkbox value={-1}> 기타 </Checkbox>
                  </Box>
                </CheckboxGroup>
              </ul>
            </Dropdown>

            {/* <footer>{checklist.join(',')} 선택</footer> */}
          </Box>
          <Box
            sx={{
              width: "10rem",
              height: "0.2rem",
              backgroundColor: "#DCDCDC",
              marginTop: "0rem",
              marginBottom: "1rem",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "10rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h1 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>부향률</h1>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                float: "right",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={(e) => setDropdown3Visibility(!dropdown3Visibility)}
            >
              {dropdown3Visibility ? "-" : "+"}
            </span>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Dropdown visibility={dropdown3Visibility}>
              <ul>
                <CheckboxGroup values={checklist3} onChange={setChecklist3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "1.2rem",
                      height: "10rem",
                      justifyContent: "space-around",
                    }}
                  >
                    <Checkbox value="EDC"> EDC </Checkbox>
                    <Checkbox value="EDP"> EDP </Checkbox>
                    <Checkbox value="EDT"> EDT </Checkbox>
                    <Checkbox value="Oil"> Oil </Checkbox>
                    <Checkbox value="PDT"> PDT </Checkbox>
                  </Box>
                </CheckboxGroup>
              </ul>
            </Dropdown>

            {/* <footer>{checklist.join(',')} 선택</footer> */}
          </Box>
          <Box
            sx={{
              width: "10rem",
              height: "0.2rem",
              backgroundColor: "#DCDCDC",
              marginTop: "0rem",
              marginBottom: "1rem",
            }}
          ></Box>
          <Button
            variant="outlined"
            onClick={() => applyFilter(page)}
            sx={{
              width: "10rem",
              height: "2rem",
              color: "black",
              backgroundColor: "#E3EAFD",
              marginTop: "0rem",
              marginBottom: "1rem",
              textAlign: "center",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            필터 적용하기
          </Button>
        </Box>

        <Box
          sx={{
            marginRight: "10rem",
            width: "100%",
          }}
        >
          <Box
            sx={{
              height: "5rem",
              width: "100%",
              marginRight: "5rem",
              mt: "5rem",
              // backgroundColor: "#E8FAFB",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            {perfumeList.totalElements && (
              <p style={{ fontWeight: "bold" }}>
                총 {perfumeList.totalElements}개의 향수가 등록되어 있습니다.
              </p>
            )}
            {/* <p>인기순 | 후기 많은 순</p> */}
            {/* <ToggleFilter /> */}
          </Box>

          {/* 여기부터 카드리스트 */}
          <Box
            sx={{
              // margin:"3rem",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginBottom: "5rem",
            }}
          >
            {Array.isArray(perfumeList.content) &&
              perfumeList.content.length > 0 &&
              perfumeList.content.map((perfume, index) => {
                return <CardComponent key={index} perfume={perfume} />;
              })}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginBottom: "3rem",
              justifyContent: "center",
            }}
          >
            <Pagination
              // total={Object.keys(perfumeList).length}
              total={perfumeList ? perfumeList.totalElements : 0}
              limit={limit}
              page={page}
              setPage={setPage}
              request={applyFilter}
            />
            {/* <Pagination
              // total={Object.keys(perfumeList).length}
              total={200}
              limit={limit}
              page={page}
              setPage={setPage}
            /> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListPage;
