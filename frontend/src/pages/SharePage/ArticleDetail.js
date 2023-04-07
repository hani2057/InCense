import React, { useEffect, useState } from 'react'
import { Box } from "@mui/system";
import styled from 'styled-components';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import {Checkbox} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import SimpleImageSlider from "react-simple-image-slider";
import CommentBox from './CommentBox';
import star1 from './star1.svg'
import star2 from './star2.svg'
import MenuButton from './MenuButton';
// import DropdownMenu from './DropdownMenu';
// import CommentSample from './CommentSample';
import api from '../../apis/api';
import { useDispatch, useSelector } from 'react-redux';
import { articleActions } from '../../store/slice/articleSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { commentActions } from '../../store/slice/commentSlice';
import { login, logout } from '../../store/slice/userSlice';


function ArticleDetail() {

  
  const [isSecret, setIsSecret] = useState(0)
  const onChangeSecret = () => {
    isSecret === 0
    ? setIsSecret(1)
    : setIsSecret(0)
    
  }
  
  const [commentValue, setCommentValue] = useState('')
  const onChangeComment = (e) => {
    const commentValue = e.target.value
    commentValue === null
    ? alert('댓글을 입력하세요')
    : setCommentValue(commentValue)
  }
  
  const article = useSelector((state) => {
    return state.articleReducers.article
  })

  const params = useParams()
  const articleId = params.articleId
  
  const [isBookmark, setIsBookMark] = useState(false)
  // const onChangeBookMark = () => {
  //   if (isBookmark === false) {
  //   setIsBookMark(true)
  //   console.log('북마크 등록')} 
  //   else {
  //     setIsBookMark(false)
  //   console.log('북마크 해제')}
  // }
  const comment = useSelector((state) => {
    return state.commentReducers.comment
  })

  const username = useSelector((state) => {
    return state.userReducers.username
  })
  const isLoggedIn = useSelector((state) => {
    return state.userReducers.isLoggedIn
  })

  
  useEffect(() => {
    isLoggedIn &&
    api.share.check(articleId)
      .then((res) => {
        setIsBookMark(res.bookmark)
      })
      .catch((err) => {
        alert(err)
      })
  }, [isBookmark])

  const onChangeBookMark = () => {
    api.share.bookmark(articleId)
    window.location.reload()
  }


  const dispatch = useDispatch()


  useEffect(() => {
    api.share.getArticle(articleId)
      .then((res) => {
        dispatch(articleActions.getArticleDetail(res))    
      })
      .catch((err) => {
        alert(err)
      })
  }, [])

  
  // {Array.isArray(perfumeList.content) &&
  //   perfumeList.content.length > 0 &&
  //   perfumeList.content.map((perfume, index) => {
  //     return <CardComponent key={index} perfume={perfume} />;
  //   })}
  
  const images = []
  if (article.imageInfo) {
  for (let i=0; i<article.imageInfo.length; i++) {
    images.push({url: `https://j8a804.p.ssafy.io/api/display?filename=${article.imageInfo[i]}`})
  }
  }

  const commentRegister = {
    content: commentValue,
    isSecret: isSecret,
    parentId: null
  }
  const navigate = useNavigate()
  // 댓글 저장 api
  const onSubmitComment = () => {
    if (isLoggedIn === true)
    {
    api.comment.register(articleId, commentRegister)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        alert(err)
      })}
      else {
        alert('로그인이 필요합니다')
        navigate('/login')
      }
  }

  // 댓글 불러오기
  useEffect(() => { 
    api.comment.getComment(articleId)
      .then((res) => {
        dispatch(commentActions.getComment(res))
      })
      .catch((err) => {
        alert(err)
      })
  }, [])


  // const [isClosed, setIsClosed] = useState()
  // const onCloseDeal = () => {
  //   api.share.close(articleId)
  // }
  // const hour = 
  // if ()
  // Number(article.createdDate.substr(11,2)) + 9
  

  return (
    <Box sx={{ width: "60%", margin: "1rem auto", marginBottom:'5rem' }}>
      <Box
        sx={{width:'100%', height:'0.2rem', backgroundColor:'#DCDCDC',marginTop:'2rem',marginBottom:'2rem',marginLeft:'1rem'}}>
      </Box>
      <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',marginLeft:'1rem'}}>
        <h1 style={{fontSize:'1.3rem', fontWeight:'bold', marginBottom:'2rem'}}>제목 : {article.title}</h1>
        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
          {isBookmark === false
          ?<img src={star1} alt='star1' style={{cursor:'pointer'}} onClick={onChangeBookMark}></img>        
          :<img src={star2} alt='star2' style={{cursor:'pointer'}} onClick={onChangeBookMark}></img>
          }
          {article.nickname===username
          ?<MenuButton articleId={articleId}/>
          :<></>}
        </Box>
      </Box>
      <Box sx={{width:'100%', minHeight:'45rem',display:'flex',flexDirection:'row', marginLeft:'1rem'}}>
        <Box sx={{width:'60%', display:'flex',flexDirection:'column'}}>
          <h2>작성자 : {article.nickname} &nbsp; 등급이름(로고)</h2>
          <p style={{fontSize:'0.7rem', color:'grey', marginTop:'0.5rem'}}>{article.createdDate.substr(0,16)}</p>
          <Box sx={{width:'100%',display:'flex',flexDirection:'row'}}>
            <Box sx={{width:'50%', display:'flex',flexDirection:'column'}}>
              {article.gubun === 'SALE'
              ?<P3>구분 : 판매</P3>
              :<P3>구분 : 나눔</P3>
              }
              <P3>구매시기 : {article.buyDate.substr(0,4)} 년 {article.buyDate.substr(5)} 월</P3>
            </Box>
            <Box sx={{width:'50%', display:'flex',flexDirection:'column'}}>
              {article.isDelivery===0
              ?<P3>거래방식 : 직거래</P3>
              :<P3>거래방식 : 택배</P3>
              }
              <P3>용량 : {article.volume} ml</P3>
            </Box>
          </Box>
          <P3>제품명 : {article.perfumeName}</P3>
          <P3>브랜드 : {article.perfumeBrand}</P3>
          <Box
            sx={{width:'100%', height:'0.1rem', backgroundColor:'#DCDCDC',marginTop:'2rem',marginBottom:'2rem'}}>
          </Box>

          <Box sx={{width:'100%', marginBottom:'5rem'}}>
            <p style={{ marginBottom:'1rem'}}>{article.content}</p>
            {/* <p style={{ marginBottom:'1rem'}}>내용2</p>
            <p style={{ marginBottom:'20rem'}}>내용3</p> */}
          </Box>
        </Box>
        <Box sx={{width:'40%', display:'flex',flexDirection:'column',marginTop:'3rem'}}>
          {images && images.length > 0 && <SimpleImageSlider
            style={{marginLeft:'2rem'}} width={300} height={400} navMargin={0} images={images} showBullets={true} showNavs={true} />}
        </Box>
        
      </Box>

      
      <h1 style={{marginLeft:'1rem', fontSize:'1.3rem',fontWeight:'bold'}}>댓글</h1>
      <Box
        sx={{width:'100%', height:'0.2rem', backgroundColor:'#DCDCDC',marginTop:'0.7rem',marginBottom:'1rem',marginLeft:'1rem'}}>
      </Box>
      <TextField fullWidth multiline rows={4} label="댓글을 입력하세요" id="commentfield" size='small' sx={{margin:'1rem'}}
        onChange={onChangeComment}/>
      <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end',marginLeft:'1rem', marginBottom:'3rem'}}>
        <FormControlLabel control={<Checkbox />} label="비밀댓글" sx={{marginRight:'3rem'}} onChange={onChangeSecret}/>
        <Button sx={{width:'4rem',height:'2rem',top:'0.2rem', fontWeight:'bold',fontSize:'0.9rem'}} variant='contained' component="label"
          onClick={onSubmitComment} size='small'> 
          저장
        </Button>
      </Box>
      <Box
        sx={{width:'100%', height:'1px', backgroundColor:'#DCDCDC',marginTop:'0.7rem',marginBottom:'1rem',marginLeft:'1rem'}}>
      </Box>
      {/* <CommentBox articleId={articleId}/>
      map으로 돌려야 함
      <CommentBox/> */}
      <Box sx={{marginBottom:'5rem'}}>
      {comment && comment.slice(0).reverse().map((comment, index) => {
              return (
                <CommentBox key={index} comment={comment} article={article} articleId={articleId} username={username} isLoggedIn={isLoggedIn}/>
              )
            })}
      </Box>
      <Box sx={{height:'3rem'}}> </Box>
    </Box>
  )
}

export default ArticleDetail;

const P3 = styled.p`
  margin-top: 1.5rem
`;

// https://www.npmjs.com/package/react-simple-image-slider  > 이미지 슬라이더 url