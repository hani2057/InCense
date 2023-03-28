import { Box } from '@mui/system';
import React from 'react'
import styled from 'styled-components';




function CheckModal({setIsOpen, idx}) {

  const handleClose = () => {
    setIsOpen(false)
  }

  const onSubmitForm = () => {
    console.log('form제출!')
  }

  console.log(idx)

  return (
    <Overlay>
      <ModalWrap>
        <Box sx={{width:'100%',height:'100%',backgroundColor:'white', display:'flex',flexDirection:'column',alignContent:'center',position:'relative'}}>
          {idx === 0
          ?<h1 style={{marginTop:'3rem',fontSize:'3rem',fontWeight:'bold',color:'#8785FF'}}>I HAD IT!</h1>
          :idx === 1
          ?<h1 style={{marginTop:'3rem',fontSize:'3rem',fontWeight:'bold',color:'#8785FF'}}>I HAVE IT!</h1>
          :<h1 style={{marginTop:'3rem',fontSize:'3rem',fontWeight:'bold',color:'#8785FF'}}>I WANT IT!</h1>}
          <Box sx={{display:'flex',flexDirection:'row',marginTop:'2rem'}}>
            <img style={{marginLeft:'2rem',width:'30%'}} src='assets/images/935.jpg' alt='perfumeImage'/>
            <Box sx={{display:'flex',flexDirection:'column',textAlign:'start',marginLeft:'2rem',marginTop:'2rem'}}>
              <h1 style={{fontSize:'1rem',marginBottom:'1rem'}}>Diptyque</h1>
              <h1 style={{fontSize:'1.5rem',marginBottom:'2rem',fontWeight:'bold'}}>fleur de peau</h1>
            </Box>
          </Box>
            <Box sx={{width:'100%',height:'4rem',backgroundColor:'#8785FF',position:'absolute',bottom:0}}onClick={() => {
              onSubmitForm()}}
              >추가하기
            </Box>
              {/* <CButton onClick={()=>setIsOpen(false)}>뒤로</CButton> */}
        </Box>
      </ModalWrap>
    </Overlay>
  );
}


const Label = styled.div` 
  // float: left;
  text-align: left;
  font-size: 20px;
  color: white;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 350px;
  height: 60px;
  outline: none;
  border-radius: 15px;
  // line-height: 2.5rem;
  font-size: 20px;
  padding-left: 1rem;
  padding-right: 0.5rem;
`;

const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;


const Overlay = styled.div`
  // position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  // background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  position: absolute;
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
`;

const Contents = styled.div`
  position: absolute;
  width: 600px;
  height: 550px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  h1 {
    color: white;
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const CButton = styled.button`
  width: 110px;
  height: 40px;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-Shadow: 2px 2px 3px;
  cursor: pointer;
  &:hover {
    background-color: #898989;
  }
`;




export default CheckModal
