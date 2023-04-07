import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
// import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const ToggleFilter2 = ({gubun,setGubun,goGubun}) => {
  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['italic']);


  useEffect(()=>{
      goGubun();
  },[gubun])
  
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event,newAlignment) => {
    setGubun(event.target.value)
    setAlignment(newAlignment);
  };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          // border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <StyledToggleButtonGroup
          color="primary"
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="" aria-label="left aligned">
            전체
          </ToggleButton>
          {/* <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} /> */}
          <ToggleButton value="SALE" aria-label="center aligned">
            판매
          </ToggleButton>
          <ToggleButton value="SHARE" aria-label="right aligned">
            나눔
          </ToggleButton>

        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}
export default ToggleFilter2;
