import styled from "styled-components";
function Pagination({ total, limit, page, setPage, request }) {
  const numPages = isNaN((total - 1) / limit)
    ? 1
    : Math.ceil((total - 1) / limit / 10);

  const clickPage = (i) => {
    setPage(i);
    request(i);
  };

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
              key={i }
              onClick={
                (e)=>clickPage(e.currentTarget.textContent)
              }
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))} */}

        {Array(numPages)
          .fill()
          .map((_, i) => {
            const start = i * 10 + 1;
            const end = Math.min(start + 9, numPages * 10);
            const pageButtons = Array(end - start + 1)
              .fill()
              .map((_, j) => start + j);

            return pageButtons.map((num) => (
              <Button
                key={num}
                onClick={() => clickPage(num)}
                aria-current={page === num ? "page" : null}
              >
                {num}
              </Button>
            ));
          })}
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
    color: #706dff;
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
    color: #706dff;
  }
`;

export default Pagination;
