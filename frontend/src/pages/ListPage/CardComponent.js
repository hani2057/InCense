import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

const CardComponent = () => {
  const navigate = useNavigate()
  const onClickCard = () => {
    // 해당id디테일로가게
    navigate('/detail')
  }

  return (
    <Card 
    sx={{
      width:"15rem",
      height:"20rem",

    }} onClick={onClickCard}>
    <CardActionArea sx={{height:"20rem"}}>
      <Box sx={{display:"flex", justifyContent:"center", flexDirection:"row"}}
>
      <CardMedia
        sx={{width:"8rem",height:"12rem", display:"flex", justifyContent:"center", flexDirection:"row"}}
        component="img"
        height="140"
        image="assets/images/fluer.png"
        alt="perfume image"
      />
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Diptyque
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          fleur de peau
        </Typography>
        <Typography variant="body2" color="text.secondary">
          75ml
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  ) 
};

export default CardComponent;
