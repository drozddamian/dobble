import { createGlobalStyle } from 'styled-components'
import RussoOne from '../assets/fonts/RussoOneRegular.ttf'
import RobotoRegular from '../assets/fonts/RobotoRegular.ttf'
import RobotoBold from '../assets/fonts/RobotoBold.ttf'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Russo';
    src: url(${RussoOne}) format('truetype');
    font-style: normal;
  }  
  
  @font-face {
    font-family: 'RobotoRegular';
    src: url(${RobotoRegular}) format('truetype');
    font-style: normal;
  }  
  
  @font-face {
    font-family: 'RobotoBold';
    src: url(${RobotoBold}) format('truetype');
    font-style: normal;
  }
  
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
    font-family: RobotoRegular;
    color: #333333;
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
    border: none;
  }
`

export default GlobalStyle
