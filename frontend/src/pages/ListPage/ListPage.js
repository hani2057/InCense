import React from "react";
import Box from '@mui/material/Box'
import CardComponent from "./CardComponent";
import { Link } from "react-router-dom";


const ListPage = () => {
  return (
    <Box>
      <Box
        sx={{
          mt: "10rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#D9D9D9",
          fontSize: "2rem",
          fontWeight:"bold"
      }}>
        <h4>향수 리스트</h4>
      </Box>
      <Box 
        sx={{
          display:"flex",
          flexDirection:"row",
        }}>
        <Box
          sx={{
            width: "20rem",
            height: "100vh",
            marginLeft:"5rem",
            mt:"10rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#FBE8E8",
            textAlign:"start"
          }}
        >
          <br></br>
          <h1>브랜드</h1>
          <br></br>
          <hr></hr>
          <li>
            brandname1
          </li>
        </Box>
        <Box
          sx={{
            marginRight:"5rem",
            width:"100%"
          }}>
          <Box
            sx={{
              height: "5rem",
              width:"100%",
              marginRight: "5rem",
              mt:"5rem",
              backgroundColor: "#E8FAFB",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              textAlign: "center"
            }}>
            <p style={{fontWeight:'bold'}}>총 n개의 향수가 등록되어 있습니다.</p>
            <p>인기순 | 후기 많은 순</p>
          </Box>
          <Box
            sx={{
              // margin:"3rem",
              width:"100%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              flexWrap:"wrap",
              marginBottom:"3rem"
              
            }}>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>

          </Box>
          <Box
            sx={{
              // margin:"3rem",
              width:"100%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              flexWrap:"wrap",
              marginBottom:"3rem"
              
            }}>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>

          </Box>
        </Box>
      </Box>
    </Box>

  )
};

export default ListPage;
