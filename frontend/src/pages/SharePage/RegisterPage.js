import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams,useLocation,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { articleActions } from "../../store/slice/articleSlice";
import RegisterOrEdit from "./RegisterOrEdit";
import api from "../../apis/api";
import axios from "axios";






const RegisterPage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
	const params = useParams();

  const {article } = useSelector((state) =>
  ({
    article: state.articleReducers.article
  }), shallowEqual)

  const [TitleValue, setTitleValue] = useState('')
  const [ContentValue, setContentValue] = useState('')

  // 새 글인지 수정인지
  const [IsForUpdate, setIsForUpdate] = useState(false);
  const search = useLocation();
  
  useEffect(() => {
    const paramsSearch = new URLSearchParams(search).get('search');
    const isRegisterForEdit = paramsSearch.split("=")[1]

    if (isRegisterForEdit === 'true') {
      setTitleValue(article.title);
      setContentValue(article.content);
      // dispatch(articleActions.fetchArticle(id))
      setIsForUpdate(true);
    } else {
      setTitleValue('');
      setContentValue('');
    }
    // setTitleValue(title);
    // setContentValue(content);
  }, []);

  const onRegisterChange = (event) => {
    const { name, value } = event.target;
    dispatch(articleActions.changeRegisterInput({ name: name, value: value }));
  };
  
  const [image, setImage] = useState({name: ""})
  const onImageChange = (event) => {
    // console.log("event ======", event)
    // console.log("event.target.files[0]", event.target.files[0])
    // setImage(()=>event.target.files[0])
    // console.log("image", image)
    setImage(event.target)
  }

  const [perfumeId, setPerfumeId] = useState('')
  const [perfumeInfo, setPerfumeInfo] = useState('');


  const onSearchPerfume = (e) => {
    setPerfumeId(e.target.value)
  }

  const formData = new FormData();
  formData.append('perfumeId', perfumeInfo.id)
  formData.append('buyDate', article.buyDate)
  formData.append('content', article.content)
  formData.append('gubun', article.gubun)
  formData.append('isClosed', article.isClosed)
  formData.append('isDelivery', article.isDelivery)
  formData.append('title', article.title)
  formData.append('volume', article.volume)
  if (article.price) {
    formData.append('price', article.price)} else {
    formData.append('price', 0)}
  // formData.append('files', image)

  for (let i = 0; i<image.length; i++) {
    formData.append('files', image[i])
  }

  const articleId = useSelector((state) => {
    return state.articleReducers.updateId
  })

  const onSubmitArticle = (event) => {
    event.preventDefault();

    if (article.title === "" || article.title === null || article.title === undefined) {
      alert("제목을 입력하세요.");
      return false;
    }
    if (
      article.content === "" ||
      article.content === null ||
      article.content === undefined
    ) {
      alert("내용을 입력하세요.");
      return false;
    }
    if (
      article.gubun === '판매' && (article.price === null || article.price === 0)
    ) {
      alert('가격을 입력하세요.')
      return false;
    }
    if (
      perfumeInfo.id === null || perfumeInfo.id === ''
    ) {
      alert('향수를 선택하세요.')
      return false;
    }
    if (
      article.buyDate === null
    ) {
      alert('구매시기를 입력하세요.')
      return false;
    }

    // const formdata = new FormData();
    formData.append('picture', image)
    const articleForRegister = {
      article: article, navigate:navigate
    };

    const articleForUpdate = {
      article: article, navigate:navigate
    };


    if (IsForUpdate) {

      console.log(articleForUpdate)
      dispatch(articleActions.updateArticle(articleForUpdate)); // 추가
      api.share.update(articleId, formData)
      .then((res) => {
        alert('등록되었습니다.')
        dispatch(articleActions.reset())
        navigate('/share')
        window.location.reload()
      })

      // navigate(`/group/${groupId}/board`);
    } else {
      // axios로 post  
      // const accessToken = sessionStorage.getItem("accessToken")
      // axios.post('https://j8a804.p.ssafy.io/api/deal', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${accessToken}`
      //   }})
      api.share.register(formData)
      alert('등록되었습니다.')
      dispatch(articleActions.reset())
      navigate('/share')
      window.location.reload()
      // dispatch(articleActions.registerArticle(articleForRegister));
      // navigate(`/group/${groupId}/board`);
    } 

  }

  return (



    <Box sx={{display:'flex',flexDirection:'column', alignItems:'center'}}>
      <Box
        sx={{
          width:'100%',
          justifyContent:'center'
        }}>
        <RegisterOrEdit
          article={article}
          id={article.id}
          titleValue={article.title}
          contentValue={article.content}
          categoryValue={article.gubun}
          priceValue={article.price}
          isDeliveryValue={article.isDelivery}
          buyDateValue={article.buyDate}
          perfumeIdValue={article.perfumeId}
          perfumeId={perfumeId}
          volumeValue={article.volume}
          onSearchPerfume={onSearchPerfume}
          userNickname={article.userNickname}
          handleRegisterChange={onRegisterChange}
          onImageHandler={onImageChange}
          handleSubmit={onSubmitArticle}
          updateRequest={IsForUpdate}
          formData = {formData}
          image={image}
          perfumeInfo={perfumeInfo}
          setPerfumeInfo={setPerfumeInfo}
          setImage={setImage}
        />
      </Box>
    </Box>


  )
};

export default RegisterPage;
