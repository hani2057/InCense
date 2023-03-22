import React, { useState } from 'react'
import { Box } from "@mui/system";
import styled from 'styled-components';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import {Checkbox} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import SimpleImageSlider from "react-simple-image-slider";
import perfumeImage from './fluer.png'
import bg1Image from './bgimg1.png'
import bg2Image from './bgimg2.png'
import bg3Image from './bgimg3.png'
import CommentBox from './CommentBox';
// import CommentSample from './CommentSample';





function ArticleDetail() {

  const images = [
    {url: perfumeImage},
    {url: bg1Image},
    {url: bg2Image},
    {url: bg3Image},
    
  ]

  const onSubmitComment = () => {
    console.log('댓글 저장')
    // 내용 담아서 쏘기!
  }
  
  const [isSecret, setIsSecret] = useState(0)
  const onChangeSecret = () => {
    isSecret === 0
    ? setIsSecret(1)
    : setIsSecret(0)

    console.log('비밀댓글 여부 변경')
  }
  console.log('비밀여부==',isSecret)

  const [commentValue, setCommentValue] = useState('')
  const onChangeComment = (e) => {
    const commentValue = e.target.value
    commentValue === null
    ? alert('댓글을 입력하세요')
    : setCommentValue(commentValue)
  }
  console.log('댓글내용==',commentValue)



  return (
    <Box sx={{ width: "60%", margin: "1rem auto" }}>
      <Box
        sx={{width:'100%', height:'0.2rem', backgroundColor:'#DCDCDC',marginTop:'2rem',marginBottom:'2rem',marginLeft:'1rem'}}>
      </Box>
      <Box sx={{width:'100%', display:'flex',flexDirection:'row', marginLeft:'1rem'}}>
        <Box sx={{width:'60%', display:'flex',flexDirection:'column'}}>
          <h1 style={{fontSize:'1.3rem', fontWeight:'bold', marginBottom:'2rem'}}>제목 : 어쩌구 저쩌구 몇ml 나눔합니다.</h1>
          <h2>작성자 : 전태영 &nbsp; 등급이름(로고)</h2>
          <p style={{fontSize:'0.7rem', color:'grey', marginTop:'0.5rem'}}>2023.03.21 15:38</p>
          <Box sx={{width:'100%',display:'flex',flexDirection:'row'}}>
            <Box sx={{width:'50%', display:'flex',flexDirection:'column'}}>
              <P3>구분 : 나눔</P3>
              <P3>구매시기 : 2023.03</P3>
            </Box>
            <Box sx={{width:'50%', display:'flex',flexDirection:'column'}}>
              <P3>구분 : 나눔</P3>
              <P3>거래방식 : 직거래</P3>
            </Box>
          </Box>
          <P3>제품명 : fleur de peau</P3>
          <P3>브랜드 : Diptyque</P3>
        </Box>
        <Box sx={{width:'40%', display:'flex',flexDirection:'column'}}>
          <SimpleImageSlider
            style={{marginLeft:'2rem'}} width={300} height={300} navMargin={0} images={images} showBullets={true} showNavs={true} />
        </Box>
        
      </Box>
      <Box
        sx={{width:'100%', height:'0.1rem', backgroundColor:'#DCDCDC',marginTop:'2rem',marginBottom:'2rem',marginLeft:'1rem'}}>
      </Box>
      <Box sx={{width:'100%', marginBottom:'5rem'}}>
        <p style={{marginLeft:'1rem', marginBottom:'1rem'}}>내용1</p>
        <p style={{marginLeft:'1rem', marginBottom:'1rem'}}>내용2</p>
        <p style={{marginLeft:'1rem', marginBottom:'1rem'}}>내용3</p>
      </Box>
      
      <h1 style={{marginLeft:'1rem', fontSize:'1.3rem',fontWeight:'bold'}}>댓글</h1>
      <Box
        sx={{width:'100%', height:'0.2rem', backgroundColor:'#DCDCDC',marginTop:'0.7rem',marginBottom:'1rem',marginLeft:'1rem'}}>
      </Box>
      <TextField fullWidth multiline rows={4} label="댓글을 입력하세요" id="commentfield" size='small' sx={{margin:'1rem'}}
        onChange={onChangeComment}/>
      <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end',marginLeft:'1rem'}}>
        <FormControlLabel control={<Checkbox />} label="비밀댓글" sx={{marginRight:'3rem'}} onChange={onChangeSecret}/>
        <Button sx={{width:'4rem',height:'2rem',top:'0.2rem', fontWeight:'bold',fontSize:'0.9rem'}} variant='contained' component="label"
          onClick={onSubmitComment} size='small'> 
          저장
        </Button>
      </Box>
      <CommentBox/>
      ---
      
    </Box>
  )
}

export default ArticleDetail;

const P3 = styled.p`
  margin-top: 1.5rem
`;

// https://www.npmjs.com/package/react-simple-image-slider  > 이미지 슬라이더 url