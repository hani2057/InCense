import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/api';
import { useDispatch } from 'react-redux';
import { articleActions } from '../../store/slice/articleSlice';

const ITEM_HEIGHT = 48;

export default function MenuButton(props) {
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const articleId = props.articleId


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
  const dispatch= useDispatch()
  const cancelConfirm = () => console.log("취소했습니다.");
  const editConfirm = () => {
    dispatch(articleActions.updateId(articleId))
    
    navigate('/share/register?isForEdit=true')
  }
  const deleteConfirm = () => {
    api.share.delete(articleId)
  }
  const closeConfirm = () => {
    api.share.close(articleId)
    navigate(`/share`)
    window.location.reload()
  }

  const onClickEl1 = useConfirm(
    '수정하시겠습니까?',
    editConfirm,
    cancelConfirm
  )

  const onClickEl2 = useConfirm(
    '삭제하시겠습니까?',
    deleteConfirm,
    cancelConfirm
  )

  const onClickEl3 = useConfirm(
    '마감하시겠습니까?',
    closeConfirm,
    cancelConfirm
  )
  




  return (
    <div style={{}}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{marginTop:'7px'}}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10ch',
          },
        }}
      >

          <MenuItem onClick={onClickEl1}>
            수정하기
          </MenuItem>
          <MenuItem onClick={onClickEl2}>
            삭제하기
          </MenuItem>
          <MenuItem onClick={onClickEl3}>
            마감하기
          </MenuItem>

      </Menu>
    </div>
  );
}