import React, { useEffect } from 'react'
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useState } from 'react';
import {FormControlLabel} from '@mui/material';
import { Button } from "@mui/material";
import {Checkbox} from '@mui/material';

import { RxLockClosed } from 'react-icons/rx';
import api from '../../apis/api';
import { useDispatch, useSelector } from 'react-redux';
import { commentActions } from '../../store/slice/commentSlice';
import ReplyBox from './ReplyBox';





function CommentBox(props) {
  
  // const userNickname = '전태영2'
  const commentWriterNickname = '전태영'

  const [replyValue, setReplyValue] = useState('')
  const onChangeReply = (e) => {
    const replyValue = e.target.value
    replyValue === null
    ? alert('답글을 입력하세요')
    : setReplyValue(replyValue)
  }

  const [isSecret, setIsSecret] = useState(0)
  const onChangeSecret = () => {
    isSecret === 0
    ? setIsSecret(1)
    : setIsSecret(0)
    
  }

  
  const comment = props.comment

  const username = props.username
  const isLoggedIn = props.isLoggedIn
  const article = props.article
  // 답글달기 누르면 입력창
  const [showPostReply, setShowPostReply] = useState(false)
  const onClickPostReply = () => {
    showPostReply === false
    ? setShowPostReply(true)
    : setShowPostReply(false)
  }
  
  const [isForEdit, setIsForEdit] = useState(false)
  const onEditcomment = () => {
    setIsForEdit(true)
  }

  // delete시 한번 팝업

  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
  
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
  
    return confirmAction;
  };

  const cancelConfirm = () => console.log("취소했습니다.");

  const [type, setType] = useState('parent')
  if (comment.parentId) {
    setType('child')
  }

  const data = {type: type}
  
  console.log(data)
  const onDeleteConfirm = () => {
    api.comment.delete(comment.commentId, data)
    window.location.reload()
  }

  const onDeleteComment = useConfirm(
    '삭제하시겠습니까?',
    onDeleteConfirm,
    cancelConfirm
    )
    
  const dispatch = useDispatch()
  // 비밀여부

  const articleId = props.articleId
  useEffect(() => {
    api.comment.getComment(articleId)
      .then((res) => {

      })
      .catch((err) => {
        alert(err)
      })
    }, [])
    
    

  const replyRegister = {
    content: replyValue,
    isSecret: isSecret,
    parentId: comment.commentId
  }
  

  const onSubmitReply = () => {
    api.comment.register(articleId, replyRegister)
    .then((res) => {
      window.location.reload()
    })
    .catch((err) => {
        alert(err)
      })
  }
  
  // 비밀댓글일때 사용자 = 작성자 or 글작성자이면 보이게 하는 조건 추가 필요
  if (comment.isSecret === 1 && username!==article.nickname && username!==comment.writer) {
    return (
      <div>
      <Box sx={{width:'100%',height:'8rem',marginLeft:'1rem', display:'flex',flexDirection:'column', borderBottom:'1px solid lightgrey',justifyContent:'center'}}>
        <div style={{margin:'0.5rem',display:'flex',flexDirection:'row'}}>
          <p style={{marginTop:'1rem',marginRight:'0.5rem'}}><RxLockClosed/></p>          <p style={{marginTop:'1rem'}}>비밀 댓글입니다.</p>
        </div>
      </Box>

      
      {/* <Box sx={{backgroundColor:'#F3F3F3',width:'100%',height:'8rem',marginLeft:'1rem', display:'flex',flexDirection:'row',borderTop:'1px solid lightgrey'}}>
        <Box sx={{width:'5%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <img src= '/assets/icons/reply.svg' alt='reply'/>
        </Box>
        <Box sx={{width:'95%',display:'flex',flexDirection:'column',justifyContent:'center'}}> 
          <div style={{margin:'0.5rem',display:'flex',flexDirection:'row'}}>
            <p style={{marginTop:'1rem',marginRight:'0.5rem'}}><RxLockClosed/></p>
            <p style={{marginTop:'1rem'}}>비밀 댓글입니다.</p>
          </div>
        </Box>   
      </Box> */}

      {/* {showPostReply === true      
      ? <Box sx={{backgroundColor:'#F3F3F3',width:'100%',height:'8rem',marginLeft:'1rem', display:'flex',flexDirection:'row',borderTop:'1px solid lightgrey'}}>
          <Box sx={{width:'5%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <img src= '/assets/icons/reply.svg' alt='reply'/>
          </Box>
          <Box sx={{width:'95%'}}>
            <TextField fullWidth multiline rows={2} label="답글을 입력하세요" id="commentfield" size='small' sx={{marginTop:'0.5rem', width:'95%',backgroundColor:'white',borderRadius:'5px'}}
            onChange={onChangeReply}/>
            <Box sx={{width:'95%',display:'flex',flexDirection:'row',justifyContent:'flex-end',marginTop:'0.5rem'}}>
              <FormControlLabel control={<Checkbox size='small' />} label="비밀답글" sx={{marginRight:'3rem',fontSize:'0.8rem'}} onChange={onChangeSecret}/>
              <Button sx={{width:'4rem',height:'2rem', fontWeight:'bold',fontSize:'0.9rem',top:'0.2rem'}} variant='contained' component="label"
                onClick={onSubmitReply} size='small'> 
                저장
              </Button>
            </Box>
          </Box>
        </Box>
      :<></>} */}
      </div>
    )
  } else {

  return (
    <div>
    <Box sx={{width:'100%',height:'8rem',marginLeft:'1rem', display:'flex',flexDirection:'column', borderBottom:'1px solid lightgrey'}}>
      <div style={{margin:'0.5rem'}}>
        
        
        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>  
        <p style={{fontWeight:'bold',fontSize:'1.1rem'}}>{comment.writer}</p>
        {username === comment.writer
        ?<Box>
          {/* <img
          src="/assets/icons/edit.svg"
          alt="modify"
          // style={{ position: "absolute", right: "0" }}
          style={{marginRight:'0.5rem',cursor:'pointer'}}
          onClick={onEditcomment}
          /> */}
          <img
          src="/assets/icons/delete.svg"
          alt="modify"
          style={{width:'18px',height:'18px',marginBottom:'1px',cursor:'pointer'}}
          onClick={onDeleteComment}
          />
          </Box>
        :<></> }
        
        </Box>
        
        <p style={{marginTop:'1rem'}}>{comment.content}</p>
        <p style={{marginTop:'0.5rem',fontSize:'0.7rem', color:'grey'}}>{comment.createdDate.substr(0,16)}</p>
        <p onClick={onClickPostReply} style={{marginTop:'0.5rem',fontSize:'0.9rem',cursor:'pointer'}}>답글 달기</p>
      </div>
    </Box>
      {/* 댓글마다의 대댓글 리스트  */}
      {comment.children && comment.children.map((reply, index) => {
        return (
          <ReplyBox key={index} index={index} article={article} username={username} isLoggedIn={isLoggedIn} comment={comment.children} parent={comment} onEditcomment={onEditcomment} onDeleteComment={onDeleteComment} onChangeSecret={onChangeSecret}
            onClickPostReply={onClickPostReply} showPostReply={showPostReply} onChangeReply={onChangeReply} onSubmitReply={onSubmitReply}/>
        )
      })}

    {showPostReply === true      
    ? <Box sx={{backgroundColor:'#F3F3F3',width:'100%',height:'8rem',marginLeft:'1rem', display:'flex',flexDirection:'row',borderTop:'1px solid lightgrey'}}>
        <Box sx={{width:'5%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <img src= '/assets/icons/reply.svg' alt='reply'/>
        </Box>
        <Box sx={{width:'95%'}}>
          <TextField fullWidth multiline rows={2} label="답글을 입력하세요" id="commentfield" size='small' sx={{marginTop:'0.5rem', width:'95%',backgroundColor:'white',borderRadius:'5px'}}
          onChange={onChangeReply}/>
          <Box sx={{width:'95%',display:'flex',flexDirection:'row',justifyContent:'flex-end',marginTop:'0.5rem'}}>
            <FormControlLabel control={<Checkbox size='small' />} label="비밀답글" sx={{marginRight:'3rem',fontSize:'0.8rem'}} onChange={onChangeSecret}/>
            <Button sx={{width:'4rem',height:'2rem', fontWeight:'bold',fontSize:'0.9rem',top:'0.2rem'}} variant='contained' component="label"
              onClick={onSubmitReply} size='small'> 
              저장
            </Button>
          </Box>
        </Box>
      </Box>
    :<></>} 
    </div>
  )}
}

export default CommentBox
