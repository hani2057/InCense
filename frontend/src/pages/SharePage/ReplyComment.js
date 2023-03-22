import React, { useState, useEffect } from 'react'
import { Stack, TextField, Button, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import uuid from "react-uuid"

import { useSelector, useDispatch } from 'react-redux'
// import comment, { addComment } from '../redux/comment'

const ReplyComment = ({ responseTo }) => {

    const [local, setLocal] = useState([])
    const [display, setDisplay] = useState(false)


    const dispatch = useDispatch()
    const comments = useSelector(state => state.comment)
    // comments.push({ a: 'bb' })
    const [commentValue, setCommentValule] = useState('')
    const [text, setText] = useState('')
    const onSubmit = (e) => {
        e.preventDefault();
        setCommentValule(text)
        let data = {
            content: text,
            writer: 'jamong',
            postId: '123123',
            responseTo: responseTo,
            commentId: uuid()
        }
        // dispatch(addComment(data))

        setText('')
    }

    useEffect(() => {
        localStorage.setItem('reply', JSON.stringify(comments))
        setLocal(comments.filter(comment => comment.responseTo === responseTo))
    }, [comments])
    return (
        <Stack sx={{ m: 1, ml: 4 }}>
            <Button onClick={() => { setDisplay(!display) }} sx={{ width: '10rem' }}>댓글</Button>
            {display &&
                <div>
                    <Box onSubmit={onSubmit}
                        component="form"
                        sx={{ m: 2 }}
                    >
                        <TextField
                            onChange={(e) => { setText(e.target.value) }}
                            placeholder="답변 추가"
                            value={text}
                            id="outlined-size-small"
                            size="small"
                            variant="standard"
                            sx={{ width: '20rem' }}
                        />
                    </Box>
                    {local.map(comment =>

                        <Box key={comment.commentId}>
                            <Stack direction="row" spacing={2}>
                                <Avatar sx={{ bgcolor: 'orangered' }}>{comment.writer.slice(0, 2)}</Avatar>
                                <Box sx={{ color: 'gray' }}>{comment.writer}</Box>
                            </Stack>
                            <Box sx={{ padding: "20px 20px" }}>{comment.content}</Box>
                            <ReplyComment responseTo={comment.commentId} />
                        </Box>
                    )}
                </div>
            }
        </Stack>
    )
}

export default ReplyComment