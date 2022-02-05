import {createGlobalStyle} from "styled-components";

export const darkTheme = {
    body: "#000",
    textColor: "#fff",
    headingColor: "lightblue"
  };
  
  export const lightTheme = {
    body: "#808080",
    textColor: "#000",
    headingColor: "#d23669"
  };
  
  export const GlobalStyles = createGlobalStyle`
   body {
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease;
   }
   h2{
     color: ${props => props.theme.headingColor};
   } `