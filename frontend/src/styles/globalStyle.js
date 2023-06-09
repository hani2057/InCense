import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  
  :root {
    /* Color */
    --main-color: #706DFF;
    --sub-color: #DDF1EE;
    --pink-main-color: #FF5DE5;
    --pink-sub-color: #FF85EC;
    --font-color: #303030;
    --gray-color: #DCDCDC;
    --dark-gray-color: #838383;
    --red-color: #E22525;

    /* Navigation bar height */
    --nav-height: 88px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  html, body {
    color: var(--font-color);
    width: 100%;
    height: 100%;
    font-family: 'Pretendard-Regular', -apple-system, 'Helvetica Neue', sans-serif;
    font-size: 1rem;
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
  }

  input {
    border: none;
    background-color: inherit;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input:focus {
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  abbr {
    text-decoration: none;
  }

  a,
  div,
  span,
  input,
  button,
  textarea {
    font-family: inherit;
    font-size: inherit;
  }
`;

export { GlobalStyle };
