import React, { useEffect } from "react";
import Box from '@mui/material/Box'
import CardComponent from "./CardComponent";
// import { Link } from "react-router-dom";
import ToggleFilter from "./ToggleFilter";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import '../../components/common/Dropdown/Dropdown.css'
import { useState } from "react";
import Checkbox from "../../components/common/select/Checkbox111";
import CheckboxGroup from "../../components/common/select/CheckboxGroup";
import Pagination from "../../components/common/Pagination/Pagination";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { perfumeInfoActions } from "../../store/slice/perfumeInfoSlice";
import api from "../../apis/api";
import { perfumeListActions } from "../../store/slice/perfumeListSlice";


const ListPage = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [dropdown2Visibility, setDropdown2Visibility] = useState(false);
  const [dropdown3Visibility, setDropdown3Visibility] = useState(false);

  const [checklist, setChecklist] = useState([])
  const [checklist2, setChecklist2] = useState([])
  const [checklist3, setChecklist3] = useState([])

  console.log(checklist)
  console.log(checklist2)
  console.log(checklist3)

  const applyFilter = () => {
    console.log('필터 적용하기')
  }

  // 페이지네이션
  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit;

  const dispatch = useDispatch()

  useEffect(() => {
    api.list.getList(page)
      .then((res) => {
        console.log('list가져오기')
        console.log(res)
        dispatch(perfumeListActions.getPerfumeList(res))
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }, [page])

  console.log('페이지==',page)

  const perfumeList = useSelector((state) => (
    state.perfumeListReducers.perfumeList
  ))

  // console.log('777',perfumeList)

  return (
    <Box sx={{marginBottom:'5rem'}}>
      <Box
        sx={{
          
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "#D9D9D9",
          fontSize: "2rem",
          fontWeight:"bold"
      }}>
        
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
            alignItems: "start",
            // backgroundColor: "#FBE8E8",
            textAlign:"start",
            
          }}
        >
          <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"10rem", alignItems:"center", marginBottom:"1rem"}}>
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
              <Box sx={{display:'flex', flexDirection:'column', fontSize:'1.2rem',height:'15rem', justifyContent:'space-around'}}>
                <Checkbox value='brand1'> brand1 </Checkbox>
                <Checkbox value='brand2'> brand2 </Checkbox>
                <Checkbox value='brand3'> brand3 </Checkbox>
                <Checkbox value='brand4'> brand4 </Checkbox>
                <Checkbox value='brand5'> brand5 </Checkbox>
                <Checkbox value='brand6'> brand6 </Checkbox>
                <Checkbox value='brand7'> brand7 </Checkbox>
                <Checkbox value='brand8'> 기타 </Checkbox>
              </Box>
            </CheckboxGroup>
            </ul>
          </Dropdown>
    
          {/* <footer>{checklist.join(',')} 선택</footer> */}
        </Box>
          <Box sx={{width:'10rem', height:'0.2rem', backgroundColor:'#DCDCDC',marginTop:'0rem',marginBottom:'1rem'}}>
          </Box>
          <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"10rem", alignItems:"center", marginBottom:"1rem"}}>
          <h1 style={{fontSize:"1.2rem",fontWeight:'bold'}}>향</h1>
          <span 
          style={{fontSize:"1.5rem",fontWeight:'bold', float:'right', textAlign:'center', cursor:'pointer'}}
          onClick={e => setDropdown2Visibility(!dropdown2Visibility)}>
                {
                    dropdown2Visibility
                        ? '-'
                        : '+'
                }
          </span>
          </Box>
          <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"50%", alignItems:"center", marginBottom:"1rem"}}>
          <Dropdown visibility={dropdown2Visibility}>
            <ul>
            <CheckboxGroup
              
              values={checklist2}
              onChange={setChecklist2}>
              <Box sx={{display:'flex', flexDirection:'column', fontSize:'1.2rem',height:'15rem', justifyContent:'space-around'}}>
                <Checkbox value='scent1'> scent1 </Checkbox>
                <Checkbox value='scent2'> scent2 </Checkbox>
                <Checkbox value='scent3'> scent3 </Checkbox>
                <Checkbox value='scent4'> scent4 </Checkbox>
                <Checkbox value='scent5'> scent5 </Checkbox>
                <Checkbox value='scent6'> scent6 </Checkbox>
                <Checkbox value='scent7'> scent7 </Checkbox>
                <Checkbox value='scent8'> 기타 </Checkbox>
              </Box>
            </CheckboxGroup>
            </ul>
          </Dropdown>
    
          {/* <footer>{checklist.join(',')} 선택</footer> */}
        </Box>
          <Box sx={{width:'10rem', height:'0.2rem', backgroundColor:'#DCDCDC',marginTop:'0rem',marginBottom:'1rem'}}>
          </Box>
          <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"10rem", alignItems:"center", marginBottom:"1rem"}}>
          <h1 style={{fontSize:"1.2rem",fontWeight:'bold'}}>부향률</h1>
          <span 
          style={{fontSize:"1.5rem",fontWeight:'bold', float:'right', textAlign:'center', cursor:'pointer'}}
          onClick={e => setDropdown3Visibility(!dropdown3Visibility)}>
                {
                    dropdown3Visibility
                        ? '-'
                        : '+'
                }
          </span>
          </Box>
          <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"50%", alignItems:"center", marginBottom:"1rem"}}>
          <Dropdown visibility={dropdown3Visibility}>
            <ul>
            <CheckboxGroup
              
              values={checklist3}
              onChange={setChecklist3}>
              <Box sx={{display:'flex', flexDirection:'column', fontSize:'1.2rem',height:'10rem', justifyContent:'space-around'}}>
                <Checkbox value='impact1'> EDC </Checkbox>
                <Checkbox value='impact2'> EDP </Checkbox>
                <Checkbox value='impact3'> EDT </Checkbox>
                <Checkbox value='impact4'> Oil </Checkbox>
                <Checkbox value='impact5'> PDT </Checkbox>
              </Box>
            </CheckboxGroup>
            </ul>
          </Dropdown>
    
          {/* <footer>{checklist.join(',')} 선택</footer> */}
        </Box>
          <Box sx={{width:'10rem', height:'0.2rem', backgroundColor:'#DCDCDC',marginTop:'0rem',marginBottom:'1rem'}}>
          </Box>
          <Button variant='outlined' onClick={applyFilter} sx={{width:'10rem', height:'2rem',color:'black' ,backgroundColor:'#E3EAFD',marginTop:'0rem',marginBottom:'1rem', textAlign:'center', cursor:'pointer', display:'flex',flexDirection:'column',justifyContent:'center',fontWeight:'bold'}}>
            필터 적용하기
          </Button>
        </Box>
        
        <Box
          sx={{
            marginRight:"10rem",
            width:"100%"
          }}>
          <Box
            sx={{
              height: "5rem",
              width:"100%",
              marginRight: "5rem",
              mt:"5rem",
              // backgroundColor: "#E8FAFB",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              textAlign: "center"
            }}>
            <p style={{fontWeight:'bold'}}>총 n개의 향수가 등록되어 있습니다.</p>
            {/* <p>인기순 | 후기 많은 순</p> */}
            <ToggleFilter/>
          </Box>

          {/* 여기부터 카드리스트 */}
          <Box
            sx={{
              // margin:"3rem",
              width:"100%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              flexWrap:"wrap",
              marginBottom:"5rem"              
            }}>
            {perfumeList && perfumeList.content.map((perfume, index) => {
              return (
              <CardComponent key={index} perfume={perfume}/>

            )})}
          </Box>
          <Box
            sx={{width:'100%',display:'flex',flexDirection:'row',marginBottom:'3rem',justifyContent:'center'}}>
            <Pagination
              // total={Object.keys(perfumeList).length}
              total={200}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </Box>
        </Box>
      </Box>

    </Box>

  )
};

export default ListPage;
