import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Roboto','Noto Sans','apple color emoji','segoe ui emoji', sans-serif;
    // font-size: 28px;
  }
  *:focus {
      outline: 0;
    }
  html {
    scroll-behaviour: smooth;
  }
  /* html, body, #root {
    height: 100vh;
  } */
  body {
    -webkit-font-smoothing: antialiased;
  }
  body, input, button, textarea {
    // font-size: 1.4rem;
    font-weight: 300;
  }
  button {
    cursor: pointer;
  }
  @media (min-width: 700px) {
    :root {
      font-size: 96%
    }
  }
`;