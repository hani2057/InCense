import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";



const ImageUpload = () => {
  const [showImages, setShowImages] = useState([]);

  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages(imageUrlLists);
  };

  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  const onSubmitArticle = () => {
    console.log('작성글 저장!')
  }

  return (
    <Box sx={{width:'100%', display:'flex',flexDirection:'column', margin:'1rem'}} >
      {/* <label htmlFor="input-file"  onChange={handleAddImages}>
        <input type="file" id="input-file" multiple   />          
      </label> */}
      <Box sx={{width:'100%', display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
        <Button sx={{width:'6rem', fontStyle:'bold'}} variant='outlined' component="label">
          사진 추가
          <input hidden accept="image/*" multiple type="file" onChange={handleAddImages}/>
        </Button>
        <Button sx={{width:'6rem', fontStyle:'bold'}} variant='contained' component="label"
          onClick={onSubmitArticle}>
          저장하기
        </Button>
      </Box>
      <Box sx={{width:'100%', display:'flex',flexDirection:'row', justifyContent:'start'}}>
      {showImages.map((image, id) => (
        <Box key={id} sx={{display:'flex',flexDirection:'column', marginY:'1rem', marginRight:'1rem', position:'relative'}}>
          <img src={image} alt={`${image}-${id}`} style={{width:'10rem',height:'10rem'}} />
          <button style={{position:'absolute',top:'0',right:'5%'}} onClick={() => handleDeleteImage(id)}> x </button> 
        </Box>
      ))}
      </Box>
    </Box>
  );
};

export default ImageUpload;