import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "../../components/common/Pagination/Pagination";
import { Box } from "@mui/system";
import api from "../../apis/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reviewActions } from "../../store/slice/reviewSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E3EAFD",
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ReviewTable(props) {
  const onClickReview = () => {
    // 후기 모달 오픈하도록
  };

  const dispatch = useDispatch();

  const perfumeInfo = props.perfumeInfo;
  const detailId = props.detailId;

  // api.review.getReview(detailId, 1)
  const page = 1;
  useEffect(() => {
    api.review
      .getReview(detailId, page)
      .then((res) => {
        dispatch(reviewActions.getReview(res));
      })
      .catch((err) => {
        alert(err);
      });
  }, [page]);

  const reviewList = useSelector((state) => {
    return state.reviewReducers.review?.content;
  });

  // function createData(id, name, content, score) {
  //   return { id, name, content, score};
  // }

  const rows =
    reviewList &&
    reviewList.map((review, index) => {
      return (
        // createData(index+1, review.name, review.comment, review.preference)
        {
          id: index + 1,
          name: review.name,
          comment: review.comment,
          preference: review.preference,
        }
      );
    });
  return (
    <Box>
      {!rows ? (
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginTop: "2rem",
            marginBottom: "3rem",
          }}
        >
          후기 (0)
        </h1>
      ) : (
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginTop: "2rem",
            marginBottom: "3rem",
          }}
        >
          후기 ({rows.length})
        </h1>
      )}
      <TableContainer component={Paper}>
        <Table
          padding="none"
          sx={{ minWidth: 700, width: "80rem", height: "15rem" }}
          aria-label="customized table"
        >
          <TableHead sx={{ height: "2.5rem" }}>
            <TableRow>
              <StyledTableCell align="center" sx={{ width: "5rem" }}>
                번호
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "10rem" }}>
                작성자
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "50rem" }}>
                내용
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "15rem" }}>
                평점
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <StyledTableRow key={row.id} sx={{ height: "2.5rem" }}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ textAlign: "center", cursor: "pointer" }}
                    onClick={onClickReview}
                  >
                    {row.comment}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.preference}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Pagination
        total={reviewList ? reviewList.length : 0}
        limit={5}
        page={5}
        setPage={1}
      /> */}
    </Box>
  );
}
