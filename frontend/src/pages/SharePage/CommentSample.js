import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uuid from "react-uuid"

// import { addComment } from '../redux/comment'
import ReplyComment from './ReplyComment'

import { Stack, TextField, Button, Avatar } from '@mui/material';
import { border, Box } from '@mui/system';
const CommentSample = () => {
    const [local, setLocal] = useState([])

    const dispatch = useDispatch()
    const comments = useSelector(state => state.comment)
    const [commentValue, setCommentValule] = useState('')
    const [text, setText] = useState('')
    const [display, setDisplay] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault();
        setCommentValule(text)
        let data = {
            content: text,
            writer: 'jamong',
            postId: '123123',
            responseTo: 'root',
            commentId: uuid()
        }
        // dispatch(addComment(data))

        setText('')
    }
    // useEffect(() => {
    //     localStorage.setItem('reply', JSON.stringify(comments))
    //     setLocal(comments.filter(comment => comment.responseTo === 'root'))
    // }, [comments])
    return (
        <Stack sx={{ m: 5 }}>
            <Box onSubmit={onSubmit}
                component="form"
            >
                <TextField
                    onChange={(e) => { setText(e.target.value) }}
                    placeholder="답변 추가"
                    value={text}
                    id="outlined-size-small"
                    size="small"
                    variant="standard"
                    sx={{ width: '30rem' }}
                />
            </Box>

            {local.map((comment, index) => (

                <Box sx={{ m: 2 }} key={comment.commentId}>
                    <Stack direction="row" spacing={2}>
                        <Avatar sx={{ bgcolor: 'orangered' }}>{comment.writer.slice(0, 2)}</Avatar>
                        <Box sx={{ color: 'gray' }}>{comment.writer}</Box>
                    </Stack>
                    <Box key={index} sx={{ padding: "20px 20px" }}>{comment.content}</Box>
                    <ReplyComment responseTo={comment.commentId} />
                    <hr style={{ borderTop: '1px solid gray' }} />
                </Box >
            ))}
        </Stack >

    )
}

export default CommentSample