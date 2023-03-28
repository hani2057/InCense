import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams,useLocation,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { articleActions, articleReducers } from "../../store/slice/articleSlice";

// import RegisterOrEdit from "./RegisterOrEdit";






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

  const formdata = new FormData();
  const onSubmitArticle = (event) => {
    event.preventDefault();

    if (article.title === "" || article.title === null || article.title === undefined) {
      alert("제목을 작성하십시오.");
      return false;
    }
    if (
      article.content === "" ||
      article.content === null ||
      article.content === undefined
    ) {
      alert("내용을 작성하십시오.");
      return false;
    }

    // const formdata = new FormData();
    formdata.append('picture', image)
    console.log(formdata, '이건 폼데이터')
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
      
      dispatch(articleActions.registerArticle(articleForRegister));
      // navigate(`/group/${groupId}/board`);
    } 

  }

  return (



    <Box sx={{display:'flex',flexDirection:'column', alignItems:'center'}}>
      <Box
        sx={{
          width:'70%',
          backgroundColor:'lightgrey',
          justifyContent:'center'
        }}>
        <h1>나눔/판매글 작성 페이지</h1>
        {/* <RegisterOrEdit
          id={article.id}
          titleValue={article.title}
          contentValue={article.content}
          userNickname={article.userNickname}
          handleRegisterChange={onRegisterChange}
          onImageHandler={onImageChange}
          handleSubmit={onSubmitArticle}
          updateRequest={IsForUpdate}
          formData = {formdata}
          picture={image.name}
        /> */}
      </Box>
    </Box>


  )
};

export default RegisterPage;
