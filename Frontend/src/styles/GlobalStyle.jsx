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
        text-decoration: none;
        ;
        
        
    }

    #root{
        width: 100%;
        height: 100%;
        overflow: hidden;
        
    }


    :root {
        --dark-purple: rgb(73, 36, 62);
        --purple: rgb(112, 66, 100);
        --light-purple: rgb(187, 132, 147);
        --tan: rgb(219, 175, 160)
    }
`;
