import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import ImageUpload from "./ImageUpload";
import FormHelperText from '@mui/material/FormHelperText';
import api from "../../apis/api";
import styled from "styled-components";
import SearchResult from "../../components/Profile/SearchModal/SearchResult";
import {
  SearchResultWrapper,
} from "./style";


const RegisterOrEdit = (props) => {

  const categories = [
    {
      value: 'SALE',
      label: '판매'
    },
    {
      value: 'SHARE',
      label: '나눔'
    },
  ]
  const deliveryMethods = [
    {
      value: 1,
      label: '택배'
    },
    {
      value: 0,
      label: '직거래'
    },
  ]

  const onSubmitForm = () => {
  }
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchSearch = async () => {
    const res = await api.profile.searchPerfume(searchQuery);
    if (res.content.length) setSearchResult(res.content);
    else {
      setErrorMsg("검색 결과가 없습니다");
    }
  };
  
  // console.log(searchResult)
  // console.log(perfumeInfo)



  // const [categoryValue, setCategoryValue] = useState('SALE')
  // const onChangeCategory = (e) => {
  //   const categoryValue = e.target.value
  //   categoryValue === 'SALE' ? setCategoryValue(categoryValue) : setCategoryValue('SHARE')
  //   setPriceValue(priceValue)
  // }
  // console.log('카테고리==', categoryValue)

  // const [priceValue, setPriceValue] = useState(0)
  // const onChangePrice = (e) => {
  //   const priceValue = e.target.value
  //   setPriceValue(priceValue)
  // }
  // console.log('가격==',priceValue)

  // const [isDelivery, setIsDelivery] = useState(1)
  // const onChangeDelivery = (e) => {
  //   const isDelivery = e.target.value
  //   isDelivery === 1 ? setIsDelivery(isDelivery) : setIsDelivery(0)
  // }
  // console.log('거래방식==',isDelivery)

  // const [titleValue, setTitleValue] = useState('')
  // const onChangeTitle = (e) => {
  //   const titleValue = e.target.value
  //   titleValue === null
  //   ? alert('제목을 입력하세요')
  //   : setTitleValue(titleValue)
  // }
  // console.log('제목==', titleValue)

  // const [contentValue, setContentValue] = useState('')
  // const onChangeContent = (e) => {
  //   const contentValue = e.target.value
  //   contentValue === null
  //   ? alert('내용을 입력하세요')
  //   : setContentValue(contentValue)
  // }
  // console.log('내용==', contentValue)

  // const [buyDateValue, setBuyDateValue] = useState('')
  // const onChangeBuyDate = (e) => {
  //   const buyDateValue = e.target.value
  //   setBuyDateValue(buyDateValue)
  // }
  // console.log('구매시기==', buyDateValue)

  // const [volumeValue, setVolumeValue] = useState(0)
  // const onChangeVolume = (e) => {
  //   const volumeValue = e.target.value
  //   setVolumeValue(volumeValue)
  // }
  // console.log('용량==',volumeValue)

  // 가격,구매시기 error text
  // const [priceError, setPriceError] = useState('')
  // const [buyDateError, setBuyDateError] = useState('')

  // const priceRegex = /^[0-9]+$/;
  // if (!priceRegex.test(priceValue)) {
  //   setPriceError('숫자만 입력하세요.')
  // } else {
  //   setPriceError('')
  // }

  // const buyDateRegex = /([12]\d{3}\.(0[1-9]|1[0-2]))/;
  // if (!buyDateRegex.test(buyDateValue)) {
  //   setBuyDateError('YYYY.MM 형식으로 입력하세요')
  // } else { 
  //   setBuyDateError('')
  // }


  return (
    <Box sx={{ width: "60%", margin: "1rem auto" }}>
      <Box
      sx={{width:'100%', height:'0.2rem', backgroundColor:'#DCDCDC',marginTop:'2rem',marginBottom:'2rem',marginLeft:'1rem'}}>
      </Box>
      <form enctype="multipart/form-data" onSubmit={onSubmitForm}>
        <br/>
        <Box sx={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
          <Box sx={{ width: "50rem", margin: "1rem", marginBottom:'0',display:'flex',flexDirection:'row', justifyContent:'start' }}>
            <TextField
              id="outlined-select-category-uncontrolled"
              select
              label="카테고리"
              name="category"
              value={props.categoryValue}
              helperText="카테고리를 선택하세요"
              size='small'
              onChange={props.handleRegisterChange}
              sx={{width:'12rem',marginRight:'3rem'}}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {props.categoryValue === 'SALE'
            ?<TextField
            id="outlined-number-uncontrolled"
            label="가격 (원)"
            type="number"
            name='price'
            size='small'
            helperText='가격을 입력하세요'
            onChange={props.handleRegisterChange}
            value={props.priceValue}
            sx={{width:'12rem'}}
            />
            :<TextField
            disabled
            id="price"
            name='price'
            label="가격 (원)"
            type="number"
            size='small'
            sx={{width:'12rem'}}
            helperText='판매일 경우만 입력'
            />}
            {/* <FormHelperText>{priceError}</FormHelperText> */}
            
            
          </Box>
          <Box sx={{ Width: "50rem", margin: "1rem",display:'flex', marginBottom:'0',flexDirection:'row', justifyContent:'start' }}>
          <TextField
              id="isDelivery"
              select
              label="거래방식"
              defaultValue="1"
              name="isDelivery"
              value={props.idDeliveryValue}
              helperText="거래방식을 선택하세요"
              size='small'
              onChange={props.handleRegisterChange}
              sx={{width:'12rem',marginRight:'3rem'}}
            >
              {deliveryMethods.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
            id="buyDate"
            label="구매시기"
            type="number"
            // inputProps={{ pattern:([12]\d{3}\.(0[1-9]|1[0-2])) }}
            size='small'
            helperText='YYYY.MM으로 입력해주세요'
            name="buyDate"
            value={props.buyDateValue}
            onChange={props.handleRegisterChange}
            sx={{width:'12rem'}}
            />
            {/* <FormHelperText>{buyDateError}</FormHelperText> */}
          {/* <input onChange={props.handleRegisterChange}
            value={props.titleValue} type='text' name='title'/>
          <hr></hr>
            <textarea onChange={props.handleRegisterChange}
            value={props.contentValue} name='content'/>
          <hr></hr> */}
          {/* <PictureUploader2 formData={props.formData}/> */}
          {/* <input type='file'>파일2</input> */}
          </Box>
          <Box sx={{width:'50rem',display:'flex',flexDirection:'row',justifyContent:'start',margin:'1rem'}}>
            
            {/* ###검색 코드... */}
            {/* <TextField  label="검색 코드 추가하기" id="fullWidth" size='small' name="perfumeId" value={props.perfumeIdValue} onChange={props.handleRegisterChange} sx={{width:'18rem', marginTop:'1rem', marginRight:'2rem'}} /> */}
            {!props.perfumeInfo
            ?<TextField  label="향수 이름" id="fullWidth" size='small' name="perfumeId" value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setErrorMsg("");
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                fetchSearch();
                setSearchQuery("");
              }
            }}
            sx={{width:'18rem', marginTop:'1rem', marginRight:'2rem'}} />
            :<TextField  label='향수 이름' id="fullWidth" size='small' name="perfumeId" value={props.perfumeInfo.name} sx={{width:'18rem', marginTop:'1rem', marginRight:'2rem'}} />}
            {searchResult && (
                <SearchResultWrapper>
                  {searchResult.map(({ id, image, brandName, name }) => (
                    <SearchResult
                      id={id}
                      img={image}
                      brand={brandName}
                      name={name}
                      setPerfumeInfo={props.setPerfumeInfo}
                      setSearchResult={setSearchResult}
                      key={id}
                    />
                  ))}
                </SearchResultWrapper>
              )}
            <TextField  label="용량 (ml)" id="fullWidth" type='number' name="volume" value={props.volumeValue} onChange={props.handleRegisterChange} size='small' sx={{width:'7rem',marginTop:'1rem',marginRight:'0.5rem'}} />

          </Box>
          <TextField fullWidth label="제목을 입력하세요" id="fullWidth" name="title" size='small' sx={{margin:'1rem'}}
            onChange={props.handleRegisterChange} value={props.titleValue}/>
          <TextField fullWidth multiline rows={20} label="내용을 입력하세요" name='content' id="fullWidth" size='small' sx={{margin:'1rem'}}
            onChange={props.handleRegisterChange} value={props.contentValue}/>
            {/* <Button variant="contained" component="label" 
              sx={{margin:'1rem', width:'7rem'}}>
              사진 업로드
              <input onChange={} hidden accept="image/*" multiple type="file" />
            </Button> */}
          <ImageUpload image={props.image} setImage={props.setImage} onImageHandler={props.onImageHandler} onSubmitArticle={props.handleSubmit} formData={props.formData} picture={props.picture}/>

        </Box>
        {/* <input onChange={props.onImageHandler} type="file" name="picture" 
        accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"/> */}
        {/* <button onClick={props.handleSubmit}>
          {props.updateRequest ? "수정" : "등록"}
        </button> */}
      </form>

    </Box>
  )
};

export default RegisterOrEdit;

const FormHelperTexts = styled(FormHelperText)`
width: 100%;
padding-left: 16px;
font-weight: 700 !important;
color: #d32f2f !important;
`;