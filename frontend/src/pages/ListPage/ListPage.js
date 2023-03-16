import React from "react";
import Box from '@mui/material/Box'
import CardComponent from "./CardComponent";
import { Link } from "react-router-dom";
import ToggleFilter from "./ToggleFilter";
import Dropdown from "./Dropdown";
import { useState } from "react";
import './Dropdown.css'
import Checkbox from "../../components/common/Checkbox/Checkbox";
import CheckboxGroup from "../../components/common/Checkbox/CheckboxGroup";
import Pagination from "../../components/Pagination/Pagination";


const ListPage = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [checklist, setChecklist] = useState([])
  console.log(checklist)
  return (
    <Box sx={{marginBottom:'5rem'}}>
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
          <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"50%", alignItems:"center", marginBottom:"1rem"}}>
          <h1 style={{fontSize:"1.2rem",fontWeight:'bold'}}>브랜드</h1>
          <span 
          style={{fontSize:"1.5rem",fontWeight:'bold', float:'right', textAlign:'center', cursor:'pointer'}}
          onClick={e => setDropdownVisibility(!dropdownVisibility)}>
                {
                    dropdownVisibility
                        ? '-'
                        : '+'
                }
          </span>
          </Box>
          <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"50%", alignItems:"center", marginBottom:"1rem"}}>
          <Dropdown visibility={dropdownVisibility}>
            <ul>
            <CheckboxGroup
              
              values={checklist}
              onChange={setChecklist}>
              <Box sx={{display:'flex', flexDirection:'column', fontSize:'1.2rem',height:'7rem', justifyContent:'space-around'}}>
                <Checkbox value='brand1'> brand1 </Checkbox>
                <Checkbox value='brand2'> brand2 </Checkbox>
                <Checkbox value='brand3'> brand3 </Checkbox>
                <Checkbox value='brand4'> brand4 </Checkbox>
              </Box>
            </CheckboxGroup>
            </ul>
          </Dropdown>
          {/* <footer>{checklist.join(',')} 선택</footer> */}
        </Box>
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
            {/* <p>인기순 | 후기 많은 순</p> */}
            <ToggleFilter/>
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
            sx={{width:'100%',display:'flex',flexDirection:'row',marginBottom:'3rem',justifyContent:'center'}}>
            <Pagination
              total={10}
              limit={5}
              page={5}
              setPage={1}
            />
          </Box>
        </Box>
      </Box>

    </Box>

  )
};

export default ListPage;
