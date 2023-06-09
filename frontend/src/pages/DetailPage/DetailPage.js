import React, { useState } from "react";
import { Box } from "@mui/system";
// import BellIcon from './bell1.svg'
import {BsBell} from 'react-icons/bs'
import {BsFillBellFill} from 'react-icons/bs'
import { Button } from "@mui/material";
import CardComponent from "../ListPage/CardComponent";
import DivideLine from "../../components/common/DivideLine/DivideLine";
import ReviewTable from "./ReviewTable";
import { useNavigate } from "react-router";

const DetailPage = () => {
  const [alarmStatus, setAlarmStatus] = useState(false)
  const isLoggedIn = true
  const navigate = useNavigate()
  const onChangeAlarm = () => {
    if (isLoggedIn === true) {
      if(alarmStatus === false) {
        setAlarmStatus(true)
        console.log('알람on')
      } else if (alarmStatus === true) {
        setAlarmStatus(false)
        console.log('알람off')
      }
    } else {
      alert('로그인이 필요합니다.')
      navigate('/login')
    }
  }

  const [showSimilarity, setShowSimilarity] = useState(false)
  const onClickButton = () => {
    if (isLoggedIn === true) {
      setShowSimilarity(true)
      console.log('유사도 보여주기')
    }
    else {
      alert('로그인이 필요합니다.')
      navigate('/login')
    }
  }

  return (

    <Box sx={{marginBottom:'5rem', display:'flex',flexDirection:'column',alignItems:'center'}}>
      <Box
        sx={{
          mt: "10rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "#D9D9D9",
          fontSize: "2rem",
          fontWeight:"bold",
          marginBottom:'3rem'
      }}>
        {/* <h4>DETAIL</h4> */}
      </Box>

      <Box
        sx={{
          width:'100%',
          height:'100%',
          display:"flex",
          flexDirection:"row",
          justifyContent:'center',
          // backgroundColor:"#FBE8E8",
          my:'3rem'
      }}>
        <Box
          sx={{
            width:'40rem',
            display:'flex',
            flexDirection:'column',
            textAlign:'center',
            alignItems:'center',
            marginRight:'8rem'
        }}>
          {/* <h1>이미지 자리</h1> */}
          <Box
            sx={{
              width:'25rem',
              height:'25rem',
              border:'1px solid lightgrey',
              justifyContent:'center',
              alignItems:'center',
              backgroundColor:'white',
              position:'relative'
          }}>
              {alarmStatus === false
                ?<BsBell style={{position:'absolute',right:'1rem',top:'1rem', fontSize:'2rem',cursor:'pointer' }}
                onClick={onChangeAlarm}></BsBell>
                :<BsFillBellFill style={{position:'absolute',right:'1rem',top:'1rem', fontSize:'2rem', color:'#706DFF',cursor:'pointer' }}
                onClick={onChangeAlarm}></BsFillBellFill>}
            <img style={{width:'auto', height:'20rem', position:'relative', top:'2.5rem'}} src="/images/fluer.png" alt='detailimage'></img>
          </Box>
          <Box
            sx={{width:'25rem', height:'5rem', backgroundColor:'lightgrey'}}>
            모달 자리.
          </Box>
        </Box>
        <Box
          sx={{
            width:'40rem',
            display:'flex',
            flexDirection:'column',
            marginLeft:'8rem'
        }}>
          {/* <h1>설명 자리</h1> */}
          <p>Diptyque</p>
          <p style={{fontSize:'2rem', fontWeight:'bold', marginTop:'1rem', marginBottom:'1.5rem'}}>fluer de peau</p>
          <ul>
            <li style={{fontWeight:'bold', marginTop:'1rem', marginBottom:'1rem'}}>Top Note  &nbsp;:&nbsp;  Woody</li>
            <li style={{fontWeight:'bold', marginTop:'1rem', marginBottom:'1rem'}}>Middle Note  &nbsp;:&nbsp;  Black Pepper</li>
            <li style={{fontWeight:'bold', marginTop:'1rem', marginBottom:'5rem'}}>Base Note  &nbsp;:&nbsp;  Vanilla, Sandalwood, And Patchouli</li>
          </ul>
          <p style={{fontSize:'2rem', fontWeight:'bold', marginTop:'1rem', marginBottom:'1.5rem'}}>내 취향과의 유사도 : &nbsp; 
            {showSimilarity === false
            ?<Button onClick={onClickButton} sx={{fontWeight:'bold'}} variant='outlined'> 확인하기 </Button>:<>72 %</>}
          </p>

          {showSimilarity === true
          ?<div>
          <p style={{fontWeight:'bold', marginTop:'1rem', marginBottom:'1rem'}}>- 이런 점이 내 취향과 비슷해요</p>
          <p>Diptyque &nbsp; 시트러스향 &nbsp; 높은 부향률</p>
          <p style={{fontWeight:'bold', marginTop:'1rem', marginBottom:'1rem'}}>- 이런 점이 내 취향과 달라요</p>
          <p>Oriental &nbsp; Vanilla</p>
          </div>
          :<></>}

        </Box>
      </Box>
      <DivideLine/>
      <Box
        sx={{width:'80rem',display:'flex'}}>
        <h1 style={{fontSize:'2rem', fontWeight:'bold', marginTop:'2rem', marginBottom:'2rem'}}>유사한 향수 목록</h1>
      </Box>
      <Box
        sx={{width:'80rem',display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'2rem',marginBottom:'2rem'}}>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
      </Box>
      <DivideLine/>
      <Box
        sx={{width:'80rem',display:'flex', flexDirection:'column'}}>
        <h1 style={{fontSize:'2rem', fontWeight:'bold', marginTop:'2rem', marginBottom:'3rem'}}>후기 (28)</h1>
        <ReviewTable/> 
      </Box>
  
    </Box>

  )
};

export default DetailPage;
