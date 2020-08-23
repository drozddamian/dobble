import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
  }
  
  div {
    box-sizing: border-box;
  }
  
  body, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    font-weight: normal;
  }
  
  p {
    font-family: Sora-Regular;
  }
  
  a {
    text-decoration: none;
  }
  
  button {
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
  }
  
  input {
    outline: none;
  }
`

export default GlobalStyle
