import React, { useState } from "react";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import ImageUpload from "./ImageUpload";


const RegisterOrEdit = () => {

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
    console.log('submit form')
  }
  const [categoryValue, setCategoryValue] = useState('SALE')
  const onChangeCategory = (e) => {
    const categoryValue = e.target.value
    categoryValue === 'SALE' ? setCategoryValue(categoryValue) : setCategoryValue('SHARE')
    setPriceValue(priceValue)
  }
  console.log('카테고리==', categoryValue)

  const [priceValue, setPriceValue] = useState(0)
  const onChangePrice = (e) => {
    const priceValue = e.target.value
    setPriceValue(priceValue)
  }
  console.log('가격==',priceValue)

  const [isDelivery, setIsDelivery] = useState(1)
  const onChangeDelivery = (e) => {
    const isDelivery = e.target.value
    isDelivery === 1 ? setIsDelivery(isDelivery) : setIsDelivery(0)
  }
  console.log('거래방식==',isDelivery)

  const [titleValue, setTitleValue] = useState('')
  const onChangeTitle = (e) => {
    const titleValue = e.target.value
    titleValue === null
    ? alert('제목을 입력하세요')
    : setTitleValue(titleValue)
  }
  console.log('제목==', titleValue)

  const [contentValue, setContentValue] = useState('')
  const onChangeContent = (e) => {
    const contentValue = e.target.value
    contentValue === null
    ? alert('내용을 입력하세요')
    : setContentValue(contentValue)
  }
  console.log('내용==', contentValue)

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
              id="outlined-select-category"
              select
              label="카테고리"
              defaultValue="SALE"
              helperText="카테고리를 선택하세요"
              size='small'
              onChange={onChangeCategory}
              sx={{marginRight:'3rem'}}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {categoryValue === 'SALE'
            ?<TextField
            id="outlined-number"
            label="가격 (원)"
            type="number"
            size='small'
            helperText='가격을 입력하세요'
            onChange={onChangePrice}
            />
            :<TextField
            disabled
            id="outlined-number"
            label="가격 (원)"
            type="number"
            size='small'
            helperText='판매일 경우만 입력 가능합니다.'
            />}
            
            
          </Box>
          <Box sx={{ Width: "50rem", margin: "1rem",display:'flex', marginBottom:'0',flexDirection:'row', justifyContent:'space-between' }}>
          <TextField
              id="outlined-select-isDelivery"
              select
              label="거래방식"
              defaultValue="1"
              helperText="거래방식을 선택하세요"
              size='small'
              onChange={onChangeDelivery}
              
            >
              {deliveryMethods.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          {/* <input onChange={props.handleRegisterChange}
            value={props.titleValue} type='text' name='title'/>
          <hr></hr>
            <textarea onChange={props.handleRegisterChange}
            value={props.contentValue} name='content'/>
          <hr></hr> */}
          {/* <PictureUploader2 formData={props.formData}/> */}
          {/* <input type='file'>파일2</input> */}
          </Box>
          <Box sx={{width:'50%'}}>
            <TextField fullWidth label="검색 코드 추가하기" id="fullWidth" size='small' sx={{margin:'1rem'}} />
          </Box>
          <TextField fullWidth label="제목을 입력하세요" id="fullWidth" size='small' sx={{margin:'1rem'}}
            onChange={onChangeTitle}/>
          <TextField fullWidth multiline rows={20} label="내용을 입력하세요" id="fullWidth" size='small' sx={{margin:'1rem'}}
            onChange={onChangeContent}/>
            {/* <Button variant="contained" component="label" 
              sx={{margin:'1rem', width:'7rem'}}>
              사진 업로드
              <input onChange={} hidden accept="image/*" multiple type="file" />
            </Button> */}
          <ImageUpload/>

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
