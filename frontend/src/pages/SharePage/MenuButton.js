import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';


const ITEM_HEIGHT = 48;

export default function MenuButton() {
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickEl1 = () => {
    console.log('수정하기')
    // navigate('/share/register?isForEdit=true')
  }

  const onClickEl2 = () => {
    console.log('삭제하기')
    alert('삭제하시겠습니까?')
  }
  
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


      </Menu>
    </div>
  );
}