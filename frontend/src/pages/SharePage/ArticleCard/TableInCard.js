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




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E3EAFD',
    color: theme.palette.common.black,
    fontWeight:'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(method, price, quantity, buyDate) {
  return { method, price, quantity, buyDate};
}

const rows = [
  createData('택배', 15000, '50ml', '2023.03'),

];

export default function TableInCard() {

  const onClickReview = () => {
    // 후기 모달 오픈하도록
    console.log('후기 모달 열기')
  }


  

  return (
    <Box>
    <TableContainer component={Paper}>
      <Table padding='none' sx={{   height:'4rem' }} aria-label="customized table">
        <TableHead sx={{height:'2rem'}}>
          <TableRow>
            <StyledTableCell align='center' sx={{width:'5rem',borderRight:'1px solid grey'}}>거래방식</StyledTableCell>
            <StyledTableCell align="center" sx={{width:'5rem',borderRight:'1px solid grey'}}>가격</StyledTableCell>
            <StyledTableCell align="center" sx={{width:'5rem',borderRight:'1px solid grey'}}>용량</StyledTableCell>
            <StyledTableCell align="center" sx={{width:'5rem'}}>구매시기</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center' component="th" scope="row" sx={{borderRight:'1px solid grey'}}>
                {row.method}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{borderRight:'1px solid grey'}}>{row.price}</StyledTableCell>
              <StyledTableCell align="center" sx={{textAlign:'center',borderRight:'1px solid grey'}} onClick={onClickReview}>{row.quantity}</StyledTableCell>
              <StyledTableCell align="center">{row.buyDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

    </Box>
  );
}