import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// import React, { useState } from 'react'
import TableInCard from './TableInCard'
import api from '../../../apis/api'
import { useEffect } from 'react'

function ArticleCard(props) {

  const type = props.article.gubun
  const isClosed = props.article.isClosed
  const article = props.article
  // console.log(article)
  // const [bgcolor, setBgcolor] = useState('none')
  // if (type === '마감') {
  //   setBgcolor('lightgrey')
  // }else{
  //   setBgcolor('none')
  // }
  
  const navigate = useNavigate()
  const id = props.article.dealId
  const onClickArticle = () => {

    navigate(`/share/article/${id}`)
  }

  const fileName = article.perfumeImage
  // console.log(article)
  // useEffect(() => {
  //   api.image.getImage(fileName)
  //     .then((res) => {
  //       // console.log('이미지가져오기')
  //       // console.log(res)
  //       // dispatch(perfumeListActions.getPerfumeList(res))
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       alert(err)
  //     })
  // }, [])


  return (
    <Box 
      sx={{width:'50%',height:'27vh', border:'2px solid transparent', borderImage:'linear-gradient(to right, #FFD6F8 0%, #FFFBD6 50%, #E1FFE9 100%)', borderImageSlice:'2',display:'flex',flexDirection:'row', '&:hover':{ boxShadow: '0 0 20px -5px #FF85EC',}, opacity:isClosed===1&&'0.5'}} >
      <img src={`https://j8a804.p.ssafy.io/api/display?filename=${fileName}`} alt='sample1' onClick={onClickArticle} style={{width:'9rem',height:'12rem',marginTop:'1rem',marginLeft:'1rem'}}/>
      <Box sx={{margin:'1rem',width:'60%'}}>
        <p onClick={onClickArticle}style={{color:'grey'}}>{article.createdDate.substr(0,16)}</p>
        <p style={{marginTop:'0.5rem',fontSize:'1.5vw',fontWeight:'bold',cursor:'pointer',}}onClick={onClickArticle} >{article.title}</p>
        <p onClick={onClickArticle}style={{marginTop:'1.5rem'}}>{article.perfumeBrand}</p>
        <p onClick={onClickArticle}style={{marginTop:'0.5rem',fontWeight:'bold'}}>{article.perfumeName}</p>
        <p onClick={onClickArticle}style={{marginTop:'1rem',fontWeight:'bold',marginBottom:'0.5rem'}}>by {article.nickName}</p>
        <TableInCard article={article}/>
      </Box>
      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        {isClosed === 1
        ? <Box sx={{marginTop:'1rem', width:'4rem',height:'2rem',border:'2px solid red', borderRadius:'5px',justifyContent:'center',textAlign:'center',fontWeight:'bold'}}>
            <p style={{color:'red',marginTop:'0.4rem'}}>마감</p>
          </Box>
        :type==='SALE' 
        ? <Box sx={{marginTop:'1rem', width:'4rem',height:'2rem',border:'2px solid #706DFF', borderRadius:'5px',justifyContent:'center',textAlign:'center',fontWeight:'bold'}}>
            <p style={{color:'#706DFF',marginTop:'0.4rem'}}>판매</p>
          </Box>
        : <Box sx={{marginTop:'1rem', width:'4rem',height:'2rem',border:'2px solid #FF5DE5', borderRadius:'5px',justifyContent:'center',textAlign:'center',fontWeight:'bold'}}>
            <p style={{color:'#FF5DE5',marginTop:'0.4rem'}}>나눔</p>
          </Box>}
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',marginBottom:'1rem'}}>
            <img src={'assets/icons/comment.svg'} alt='comment' style={{width:'1.5rem',height:'1.5rem'}}/>
            <p style={{fontSize:'1.5rem', marginLeft:'0.4rem'}}>{article.commentCount}</p>
          </Box>
      </Box>
    </Box>
  )
}

export default ArticleCard
