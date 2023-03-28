import { Box } from '@mui/material'
// import React, { useState } from 'react'
import TableInCard from './TableInCard'

function ArticleCard() {

  const type = '나눔'
  // const [bgcolor, setBgcolor] = useState('none')
  // if (type === '마감') {
  //   setBgcolor('lightgrey')
  // }else{
  //   setBgcolor('none')
  // }
  



  return (
    <Box
      sx={{width:'50%',height:'27vh', border:'2px solid transparent', borderImage:'linear-gradient(to right, #FFD6F8 0%, #FFFBD6 50%, #E1FFE9 100%)', borderImageSlice:'2',display:'flex',flexDirection:'row'}}>
      <img src='assets/images/936.jpg' alt='sample1' style={{width:'9rem',height:'12rem',marginTop:'1rem',marginLeft:'1rem'}}/>
      <Box sx={{margin:'1rem',width:'60%'}}>
        <p style={{color:'grey'}}>2023.03.24</p>
        <p style={{marginTop:'0.5rem',fontSize:'1.7rem',fontWeight:'bold'}}>이건 제목</p>
        <p style={{marginTop:'1.5rem'}}>향수 브랜드</p>
        <p style={{marginTop:'0.5rem',fontWeight:'bold'}}>이건 향수 이름</p>
        <p style={{marginTop:'1rem',fontWeight:'bold',marginBottom:'0.5rem'}}>by NickName</p>
        <TableInCard/>
      </Box>
      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        {type === '마감'
        ? <Box sx={{marginTop:'1rem', width:'4rem',height:'2rem',border:'2px solid red', borderRadius:'5px',justifyContent:'center',textAlign:'center',fontWeight:'bold'}}>
            <p style={{color:'red',marginTop:'0.4rem'}}>마감</p>
          </Box>
        :type==='판매' 
        ? <Box sx={{marginTop:'1rem', width:'4rem',height:'2rem',border:'2px solid #706DFF', borderRadius:'5px',justifyContent:'center',textAlign:'center',fontWeight:'bold'}}>
            <p style={{color:'#706DFF',marginTop:'0.4rem'}}>판매</p>
          </Box>
        : <Box sx={{marginTop:'1rem', width:'4rem',height:'2rem',border:'2px solid #FF5DE5', borderRadius:'5px',justifyContent:'center',textAlign:'center',fontWeight:'bold'}}>
            <p style={{color:'#FF5DE5',marginTop:'0.4rem'}}>나눔</p>
          </Box>}
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',marginBottom:'1rem'}}>
            <img src='assets/icons/comment.svg' alt='comment' style={{width:'1.5rem',height:'1.5rem'}}/>
            <p style={{fontSize:'1.5rem'}}>3</p>
          </Box>
      </Box>
    </Box>
  )
}

export default ArticleCard
