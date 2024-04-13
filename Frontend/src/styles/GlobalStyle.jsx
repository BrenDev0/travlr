import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        font-family: "Ubuntu", sans-serif;
         font-weight: 300;
        font-style: normal;
        font-size: 1vw;
        text-decoration: none;
        
        
    }

    #root{
        width: 100%;
        height: 100%;
        overflow: hidden;
        
    }

    body{
        width: 100%;
        height: 100%;
    }
`;
