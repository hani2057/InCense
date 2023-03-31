import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams,useLocation,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { articleActions } from "../../store/slice/articleSlice";
import RegisterOrEdit from "./RegisterOrEdit";
import api from "../../apis/api";






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
      console.log('forEdit=true')
      setTitleValue(article.title);
      setContentValue(article.content);
      // dispatch(articleActions.fetchArticle(id))
      setIsForUpdate(true);
    } else {
      setTitleValue('');
      setContentValue('');
      console.log('forEdit=false')
    }
    // setTitleValue(title);
    // setContentValue(content);
  }, []);

  const onRegisterChange = (event) => {
    const { name, value } = event.target;
    console.log('dispatch changeRegister')
    console.log(name, value)
    
    dispatch(articleActions.changeRegisterInput({ name: name, value: value }));
  };
  
  const [image, setImage] = useState({name: ""})
  const onImageChange = (event) => {
    console.log("event ======", event)
    console.log("event.target", event.target)
    console.log("event.target.files[0]", event.target.files[0])
    setImage(()=>event.target.files[0])
    console.log("image", image)
  }

  const formData = new FormData();
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
      article.perfumeId === null || article.perfumeId === ''
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
    console.log(formData, '이건 폼데이터')
    const articleForRegister = {
      article: article, navigate:navigate
    };

    const articleForUpdate = {
      article: article, navigate:navigate
    };

    if (IsForUpdate) {
      console.log('업데이트 ㄱㄱ');
      console.log(articleForUpdate);

      dispatch(articleActions.updateArticle(articleForUpdate)); // 추가
      // navigate(`/group/${groupId}/board`);
    } else {
      console.log('작성ㄱㄱ')
      console.log(articleForRegister)
      // axios로 post  
      api.share.register(articleForRegister)
      alert('등록되었습니다.')
      dispatch(articleActions.reset())
      navigate('/share')
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
          volumeValue={article.volume}

          userNickname={article.userNickname}
          handleRegisterChange={onRegisterChange}
          onImageHandler={onImageChange}
          handleSubmit={onSubmitArticle}
          updateRequest={IsForUpdate}
          formData = {formData}
          picture={image.name}
        />
      </Box>
    </Box>


  )
};

export default RegisterPage;
