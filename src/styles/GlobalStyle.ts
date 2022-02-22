import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
  }

  .full {
    width: 100vw;
    height: 100vh;
    background-color: rgb(21 20 20 / 76%);
    position: absolute;
  }

  .relative {
    position: relative;
    background: blueviolet;
    margin: 50px auto;
  }

  .center {
    margin: auto 0;

  }

  .flex {
    display: flex;
    justify-content: center;
  }

  .ds-500 {
    width: 500px;
    height: 500px;
    border: 1px black solid;
    margin: 100px auto;
  }

`
