import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import api from '../../../apis/api';
import { useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E3EAFD',
    color: theme.palette.common.black,
    fontWeight:'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    // fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    // border: 0,
  },
}));

// function createData(method, price, quantity, buyDate) {
//   return { method, price, quantity, buyDate};
// }

// const rows = [
//   createData('택배', 15000, '50ml', '2023.03'),

// ];

export default function TableInCard(props) {

  const onClickReview = () => {
  }

  const article = props.article
  

  return (
    <Box>
    <TableContainer component={Paper}>
      <Table padding='none' sx={{   height:'4rem' }} aria-label="customized table">
        <TableHead sx={{height:'2rem'}}>
          <TableRow>
            <StyledTableCell align='center' sx={{width:'5rem',borderRight:'1px solid grey', fontSize:'0.7vw'}}>거래방식</StyledTableCell>
            <StyledTableCell align="center" sx={{width:'5rem',borderRight:'1px solid grey', fontSize:'0.7vw'}}>가격(원)</StyledTableCell>
            <StyledTableCell align="center" sx={{width:'5rem',borderRight:'1px solid grey', fontSize:'0.7vw'}}>용량(ml)</StyledTableCell>
            <StyledTableCell align="center" sx={{width:'5rem', fontSize:'0.7vw'}}>구매시기</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow key={article.dealId}>
              {article.isDelivery && article.isDelivery === 1
              ?<StyledTableCell align='center' component="th" scope="row" sx={{borderRight:'1px solid grey', fontSize:'0.7vw'}}>
                택배
              </StyledTableCell>
              :<StyledTableCell align='center' component="th" scope="row" sx={{borderRight:'1px solid grey', fontSize:'0.7vw'}}>
              직거래
            </StyledTableCell>
              }
              <StyledTableCell align="center" sx={{borderRight:'1px solid grey', fontSize:'0.7vw'}}>{article.price}</StyledTableCell>
              <StyledTableCell align="center" sx={{textAlign:'center',borderRight:'1px solid grey',borderTop:'1px solid grey', fontSize:'0.7vw'}} onClick={onClickReview}>{article.volume}</StyledTableCell>
              <StyledTableCell align="center" sx={{fontSize:'0.7vw'}}>{article.buyDate}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
      </TableContainer>

    </Box>
  );
}