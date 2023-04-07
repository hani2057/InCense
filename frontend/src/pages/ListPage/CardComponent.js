import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "../../apis/api";

const CardComponent = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log(props)
  
  const fileName = props.perfume.image
  const id = props.perfume.id
  
  const onClickCard = () => {
    // 해당id디테일로가게
    navigate(`/detail/${id}`)
  }
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
    <Card 
    sx={{
      width:"15rem",
      height:"20rem",
      marginBottom:'7rem'

    }} onClick={onClickCard}>
    <CardActionArea sx={{height:"20rem"}}>
      <Box sx={{display:"flex", justifyContent:"center", flexDirection:"row"}}
>
      <CardMedia
        sx={{width:"8rem",height:"12rem", display:"flex", justifyContent:"center", flexDirection:"row"}}
        component="img"
        height="140"
        image={`https://j8a804.p.ssafy.io/api/display?filename=${fileName}`}
        alt="perfume image"
      />
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.perfume.brandName}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {props.perfume.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.perfume.volume}ml
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  ) 
};

export default CardComponent;
