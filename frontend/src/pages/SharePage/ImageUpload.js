import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";



const ImageUpload = (props) => {
  const [showImages, setShowImages] = useState([]);

  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    // const newList = []
    // for(let i=0;i<imageLists.length;i++){
    //   newList.push(imageLists[i]);
    // }
    // console.log(newList)
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages(imageUrlLists);
    // console.log('---', newList)
    props.setImage(imageLists)
  };
  
  

  const handleDeleteImage = (id) => {
    
    setShowImages(showImages.filter((_, index) => index !== id));
    // setShowImages(showImages.pop((_, index) => index !== id));
  };

  // const onSubmitArticle = () => {
  //   console.log('작성글 저장!')
  // }

  return (
    <Box sx={{width:'100%', display:'flex',flexDirection:'column', margin:'1rem'}} >
      {/* <label htmlFor="input-file"  onChange={handleAddImages}>
        <input type="file" id="input-file" multiple   />          
      </label> */}
      <Box sx={{width:'100%', display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
        <Button sx={{width:'6rem', fontStyle:'bold'}} variant='outlined' component="label">
          사진 추가
          <input id="input-file" hidden accept="image/*" multiple type="file" onChange={handleAddImages}/>
        </Button>
        <Button sx={{width:'6rem', fontStyle:'bold'}} variant='contained' component="label"
          onClick={props.onSubmitArticle}>
          저장하기
        </Button>
      </Box>
      <Box sx={{width:'100%', display:'flex',flexDirection:'row', justifyContent:'start'}}>
      {showImages.map((image, id) => (
        <Box key={id} sx={{display:'flex',flexDirection:'column', marginY:'1rem', marginRight:'1rem', position:'relative'}}>
          <img src={image} alt={`${image}-${id}`} style={{width:'10rem',height:'10rem'}} />
          <button type='button' style={{position:'absolute',top:'0',right:'5%'}} onClick={() => handleDeleteImage(id)}> x </button> 
        </Box>
      ))}
      </Box>
    </Box>
  );
};


// https://velog.io/@jkl1545/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%8B%A4%EC%A4%91-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0 참고

export default ImageUpload;