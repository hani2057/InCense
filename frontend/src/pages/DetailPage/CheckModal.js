import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { TextField } from "@mui/material";
import StarRating from './StarRating';
import api from '../../apis/api';
// import { useDispatch } from 'react-redux';
// import { reviewActions } from '../../store/slice/reviewSlice';





function CheckModal(props) {
  
  // useEffect(() => {
  //   api.list
  //     .getList(page)
  //     .then((res) => {
  //       console.log("list가져오기");
  //       console.log(res);
  //       dispatch(perfumeListActions.getPerfumeList(res));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert(err);
  //     });
  // }, [page]);

  // const handleClose = () => {
  //   props.setIsOpen(false)
  // }

  // const dispatch = useDispatch()

  const onSubmitForm = () => {
    api.review.postReview(reviewArticle)
    .then((res) => {
      props.setIsOpen(false)
      window.location.reload()
    })
    .catch((err) => {
      alert(err.message)
    })

    
  }

  // console.log(props)

  const [reviewValue, setReviewValue] = useState('')

  const onChangeReview = (e) => {
    const reviewValue = e.target.value
    setReviewValue(reviewValue)

  }

  const [starValue, setStarValue] = useState(0)

  const category = ['HAD', 'HAVE', 'WANT']

  const reviewArticle = {
    category: category[props.idx], comment: reviewValue, perfumeId: props.perfumeInfo.id, preference: starValue/2
  }



  return (
    <Overlay>
      <ModalWrap>
        <Box sx={{width:'100%',height:'100%',backgroundColor:'white', display:'flex',flexDirection:'column',alignContent:'center',position:'relative'}}>
          {props.idx === 0
          ?<h1 style={{marginTop:'3rem',fontSize:'3rem',fontWeight:'bold',color:'#8785FF'}}>I HAD IT!</h1>
          :props.idx === 1
          ?<h1 style={{marginTop:'3rem',fontSize:'3rem',fontWeight:'bold',color:'#8785FF'}}>I HAVE IT!</h1>
          :<h1 style={{marginTop:'3rem',fontSize:'3rem',fontWeight:'bold',color:'#8785FF'}}>I WANT IT!</h1>}
          <Box sx={{display:'flex',flexDirection:'row',marginTop:'2rem'}}>
            <img style={{marginLeft:'2rem',width:'25%'}} src={props.imageURL} alt='perfumeImage'/>
            <Box sx={{display:'flex',flexDirection:'column',textAlign:'start',marginLeft:'2rem',marginTop:'2rem'}}>
              <h1 style={{fontSize:'1rem',marginBottom:'1rem'}}>{props.perfumeInfo.brandName}</h1>
              <h1 style={{fontSize:'1.5rem',marginBottom:'2rem',fontWeight:'bold'}}>{props.perfumeInfo.name}</h1>
              {props.idx !== 2 &&
              <StarRating starValue={starValue} setStarValue={setStarValue}/>}
            </Box>
          </Box>

          {props.idx !== 2
          ?<Box sx={{width:'95%'}}>
            <TextField fullWidth multiline rows={4} label="다른 사람들을 위해 후기를 남겨주세요." id="fullWidth" size='small' sx={{margin:'1rem'}}
            onChange={onChangeReview}/>
          </Box>
          :<></>}
            <Box sx={{width:'100%',height:'4rem',backgroundColor:'#8785FF',display:'flex',flexDirection:'column',justifyContent:'center',position:'absolute',bottom:0}}onClick={() => {
              onSubmitForm()}}
              >
              <p style={{fontSize:'1.5rem',fontWeight:'bold',cursor:'pointer'}}>추가하기</p>
            </Box>
            <p onClick={()=>props.setIsOpen(false)} style={{fontSize:'2rem',position:'absolute',top:'2%',right:'2%',cursor:'pointer'}}>x</p>
              {/* <CButton onClick={()=>setIsOpen(false)}>뒤로</CButton> */}
        </Box>
      </ModalWrap>
    </Overlay>
  );
}


// const Label = styled.div` 
//   // float: left;
//   text-align: left;
//   font-size: 20px;
//   color: white;
//   margin-bottom: 0.5rem;
// `;

// const Input = styled.input`
//   width: 350px;
//   height: 60px;
//   outline: none;
//   border-radius: 15px;
//   // line-height: 2.5rem;
//   font-size: 20px;
//   padding-left: 1rem;
//   padding-right: 0.5rem;
// `;

// const Wrapper = styled.div`
//     & + & {
//         margin-top: 1rem;
//     }
// `;


const Overlay = styled.div`
  // position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  // background: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const ModalWrap = styled.div`
  position: fixed;
  width: 600px;
  height: 580px;
  display: flex;
  // align-items: center;
  border-radius: 10px;
  background-color: #D6D6FF;
  top: 50%;
  left: 50%;
  box-Shadow: 2px 2px 3px;
  transform: translate(-50%, -50%);
  z-index:997
  
`;
// const Contents = styled.div`
//   position: absolute;
//   width: 600px;
//   height: 550px;
//   display: flex;
  
//   flex-direction: column;
//   // align-items: center;
//   // justify-content: center;
//   h1 {
//     color: white;
//     font-size: 40px;
//     font-weight: 600;
//     margin-bottom: 20px;
//   }
// `;

// const CButton = styled.button`
//   width: 110px;
//   height: 40px;
//   font-size: 20px;
//   margin-top: 20px;
//   margin-left: 20px;
//   background-color: #ffffff;
//   border-radius: 5px;
//   box-Shadow: 2px 2px 3px;
//   cursor: pointer;
//   &:hover {
//     background-color: #898989;
//   }
// `;




export default CheckModal
