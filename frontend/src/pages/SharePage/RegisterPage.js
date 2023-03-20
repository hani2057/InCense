import React from "react";
import { Box } from "@mui/system";

const RegisterPage = () => {
  return (
    <Box sx={{display:'flex',flexDirection:'column', alignItems:'center'}}>
      <Box
        sx={{
          width:'70%',
          backgroundColor:'lightgrey',
          justifyContent:'center'
        }}>
        <h1>나눔/판매글 작성 페이지</h1>
      </Box>
    </Box>


  )
};

export default RegisterPage;
