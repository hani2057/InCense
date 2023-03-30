import React, { useEffect } from "react";
import { Box } from "@mui/system";
import ToggleFilter2 from "./ToggleFilter2";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import Checkbox from "../../components/common/select/Checkbox111";
import CheckboxGroup from "../../components/common/select/CheckboxGroup";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import ArticleCard from "./ArticleCard/ArticleCard";
import Pagination from "../../components/common/Pagination/Pagination";
import api from "../../apis/api";
import { articleListActions } from "../../store/slice/articleListSlice";
import { useDispatch, useSelector } from "react-redux";

// 체크박스 필터링시 들어가는 value값 확인하기

export default function SharePage() {

  const isLoggedIn = true

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [dropdown2Visibility, setDropdown2Visibility] = useState(false);
  const [dropdown3Visibility, setDropdown3Visibility] = useState(false);
  const [dropdown4Visibility, setDropdown4Visibility] = useState(false);


  const [checklist, setChecklist] = useState([])
  const [checklist2, setChecklist2] = useState([])
  const [checklist3, setChecklist3] = useState([])
  const [checklist4, setChecklist4] = useState([])


  console.log(checklist)
  console.log(checklist2)
  console.log(checklist3)
  console.log(checklist4)

  const applyFilter = () => {
    console.log('필터 적용하기')
  }

  const navigate = useNavigate()
  const registerPost = () => {
    if (isLoggedIn === true) {
      navigate('/share/register')
    } else {
      alert('로그인이 필요합니다.')
      navigate('/login')
    }
  }

  // 페이지네이션
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit;

  const dispatch = useDispatch()

  useEffect(() => {
    api.share.getList(page)
      .then((res) => {
        console.log('list가져오기')
        console.log(res)
        dispatch(articleListActions.getArticleList(res))
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }, [])

  const articleList = useSelector((state) => (
    state.articleListReducers.articleList.content
  ))

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
        {/* <h4>향수 나눔 / 판매</h4> */}
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
          <h1 style={{fontSize:"1.2rem",fontWeight:'bold'}}>마감 여부</h1>
          <span 
          style={{fontSize:"1.5rem",fontWeight:'bold', float:'right', textAlign:'center', cursor:'pointer',}}
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
              <Box sx={{display:'flex', flexDirection:'column', fontSize:'1.2rem',height:'4rem', justifyContent:'space-around'}}>
                <Checkbox value='expired1'> O </Checkbox>
                <Checkbox value='expired2'> X </Checkbox>
              </Box>
            </CheckboxGroup>
            </ul>
          </Dropdown>
    
          {/* <footer>{checklist.join(',')} 선택</footer> */}
        </Box>
          <Box sx={{width:'10rem', height:'0.2rem', backgroundColor:'#DCDCDC',marginTop:'0rem',marginBottom:'1rem'}}>
          </Box>
          <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"10rem", alignItems:"center", marginBottom:"1rem"}}>
          <h1 style={{fontSize:"1.2rem",fontWeight:'bold'}}>거래 방식</h1>
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
              <Box sx={{display:'flex', flexDirection:'column', fontSize:'1.2rem',height:'4rem', justifyContent:'space-around'}}>
                <Checkbox value='trade1'> 택배 </Checkbox>
                <Checkbox value='trade2'> 직거래 </Checkbox>
              </Box>
            </CheckboxGroup>
            </ul>
          </Dropdown>
    
          {/* <footer>{checklist.join(',')} 선택</footer> */}
        </Box>
          <Box sx={{width:'10rem', height:'0.2rem', backgroundColor:'#DCDCDC',marginTop:'0rem',marginBottom:'1rem'}}>
          </Box>
          <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"10rem", alignItems:"center", marginBottom:"1rem"}}>
          <h1 style={{fontSize:"1.2rem",fontWeight:'bold'}}>브랜드</h1>
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
          onClick={e => setDropdown4Visibility(!dropdown4Visibility)}>
                {
                    dropdown4Visibility
                        ? '-'
                        : '+'
                }
          </span>
          </Box>
          <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"50%", alignItems:"center", marginBottom:"1rem"}}>
          <Dropdown visibility={dropdown4Visibility}>
            <ul>
            <CheckboxGroup
              
              values={checklist4}
              onChange={setChecklist4}>
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
          
          <Button variant='outlined' onClick={applyFilter} sx={{width:'10rem', height:'2rem',color:'black' ,backgroundColor:'#E3EAFD',marginTop:'0rem',marginBottom:'1rem', textAlign:'center', cursor:'pointer', display:'flex',flexDirection:'column',justifyContent:'center',fontWeight:'bold'}}>
            필터 적용하기
          </Button>
        </Box>
        
        <Box
          sx={{
            marginRight:"15rem",
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
            <ToggleFilter2/>

            <Button variant='outlined' onClick={registerPost} sx={{width:'13rem', height:'2rem',color:'black',marginTop:'0rem',marginBottom:'1rem', textAlign:'center', cursor:'pointer', display:'flex',flexDirection:'column',justifyContent:'center',fontWeight:'bold'}}>
              내 향수 나눔/판매 하기
            </Button>
          </Box>
          <Box
            sx={{
              // margin:"3rem",
              width:"100%",
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              flexWrap:"wrap",
              marginBottom:"5rem"              
            }}>
            {articleList && articleList.map((article, index) => {
              return (
                <ArticleCard key={index} article={article}/>
              )
            })}
            {/* <ArticleCard/>
            <ArticleCard/>
            <ArticleCard/>
            <ArticleCard/>
            <ArticleCard/>
            <ArticleCard/>
            <ArticleCard/>
            <ArticleCard/>
            <ArticleCard/>
            <ArticleCard/> */}
            <Pagination 
              // total={Object.keys(perfumeList).length}
              total={2}
              limit={limit}
              page={page}
              setPage={setPage}/>
          </Box>


        </Box>
      </Box>

    </Box>


  )
}