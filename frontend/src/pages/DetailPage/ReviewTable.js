import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '../../components/common/Pagination/Pagination';
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

function createData(id, name, content, score) {
  return { id, name, content, score};
}

const rows = [
  createData(1, '전태영', '제가 써본 향수 중에 제일 향기로워요!', 5),
  createData(2, '전태영', '제가 써본 향수 중에 제일 향기로워요!', 5),
  createData(3, '전태영', '제가 써본 향수 중에 제일 향기로워요!', 5),
  createData(4, '전태영', '제가 써본 향수 중에 제일 향기로워요!', 5),
  createData(5, '전태영', '제가 써본 향수 중에 제일 향기로워요!', 5),
];

export default function ReviewTable() {

  const onClickReview = () => {
    // 후기 모달 오픈하도록
    console.log('후기 모달 열기')
  }


  

  return (
    <Box>
    <TableContainer component={Paper}>
      <Table padding='none' sx={{ minWidth: 700, width:'80rem', height:'15rem' }} aria-label="customized table">
        <TableHead sx={{height:'2.5rem'}}>
          <TableRow>
            <StyledTableCell align='center' sx={{width:'5rem'}}>번호</StyledTableCell>
            <StyledTableCell align="center" sx={{width:'10rem'}}>작성자</StyledTableCell>
            <StyledTableCell align="center" sx={{width:'50rem'}}>내용</StyledTableCell>
            <StyledTableCell align="center" sx={{width:'15rem'}}>평점</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center' component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center" sx={{textAlign:'start', cursor:'pointer'}} onClick={onClickReview}>{row.content}</StyledTableCell>
              <StyledTableCell align="center">{row.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <Pagination
        total={10}
        limit={5}
        page={5}
        setPage={1}
      />
    
    </Box>
  );
}