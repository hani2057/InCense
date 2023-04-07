import React from 'react'
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useState } from 'react';
import {FormControlLabel} from '@mui/material';
import { Button } from "@mui/material";
import {Checkbox} from '@mui/material';
import { login, logout } from '../../store/slice/userSlice';


function ReplyBox(props) {

  // const userNickname = '전태영'
  const reply = props.comment[props.index]
  

  return (
    <Box>
    <Box sx={{backgroundColor:'#F3F3F3',width:'100%',height:'8rem',marginLeft:'1rem', display:'flex',flexDirection:'row',borderTop:'1px solid lightgrey'}}>
      <Box sx={{width:'5%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <img src= '/assets/icons/reply.svg' alt='reply'/>
      </Box>
      <Box sx={{width:'95%'}}> 
        <div style={{margin:'0.5rem'}}>
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <p style={{fontWeight:'bold',fontSize:'1.1rem'}}>{reply.writer}</p>
          {props.username === reply.writer
          ?<Box>
            {/* <img
            src="/assets/icons/edit.svg"
            alt="modify"
            // style={{ position: "absolute", right: "0" }}
            style={{marginRight:'0.5rem',cursor:'pointer'}}
            onClick={props.onEditcomment}
            /> */}
            <img
            src="/assets/icons/delete.svg"
            alt="delete"
            style={{width:'18px',height:'18px',marginBottom:'1px',cursor:'pointer'}}
            onClick={props.onDeleteComment}
            />
            </Box>
          :<></> }
          
          </Box>
          
          <p style={{marginTop:'1rem'}}>{reply.content}</p>
          <p style={{marginTop:'0.5rem',fontSize:'0.7rem', color:'grey'}}>{reply.createdDate}</p>
          <p onClick={props.onClickPostReply} style={{marginTop:'0.5rem',fontSize:'0.9rem',cursor:'pointer'}}>답글 달기</p>
        </div>
      </Box>   
    </Box>

  {/* {props.showPostReply === true      
    ? <Box sx={{backgroundColor:'#F3F3F3',width:'100%',height:'8rem',marginLeft:'1rem', display:'flex',flexDirection:'row',borderTop:'1px solid lightgrey'}}>
        <Box sx={{width:'5%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <img src= '/assets/icons/reply.svg' alt='reply'/>
        </Box>
        <Box sx={{width:'95%'}}>
          <TextField fullWidth multiline rows={2} label="답글을 입력하세요" id="commentfield" size='small' sx={{marginTop:'0.5rem', width:'95%',backgroundColor:'white',borderRadius:'5px'}}
          onChange={props.onChangeReply}/>
          <Box sx={{width:'95%',display:'flex',flexDirection:'row',justifyContent:'flex-end',marginTop:'0.5rem'}}>
            <FormControlLabel control={<Checkbox size='small' />} label="비밀답글" sx={{marginRight:'3rem',fontSize:'0.8rem'}} onChange={props.onChangeSecret}/>
            <Button sx={{width:'4rem',height:'2rem', fontWeight:'bold',fontSize:'0.9rem',top:'0.2rem'}} variant='contained' component="label"
              onClick={props.onSubmitReply} size='small'> 
              저장
            </Button>
          </Box>
        </Box>
      </Box>
    :<></>
  } */}
  </Box>
  )
}

export default ReplyBox
