import styled from "styled-components";
import api from "../../apis/api"
import { useDispatch } from "react-redux";
import {} from  

function Pagination({ total, limit, page, setPage,customReducer }) {
  const numPages = Math.ceil(total / limit);
  const dispatch = new useDispatch();
 
  const clickPage = (i) => {
    () => setPage(i + 1)
    dispatch(customReducer(res));
  }
  
  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {/* {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={
                  clickPage(i)
              }
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))} */}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
  
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  color: grey;
  font-size: 1rem;

  &:hover {
    background: lightgrey;
    cursor: pointer;
    transform: translateY(-2px);
    color: #706DFF;
    font-weight: bold;

  }

  &[disabled] {
    
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: lightgrey;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    color: #706DFF;
  }
`;

export default Pagination;