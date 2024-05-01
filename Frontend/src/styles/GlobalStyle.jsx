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
        width: 100vw;
        height: 100vh;
       
       
        
    }


    :root {
        --black: rgb(31, 23, 23);
        --red: rgb(206, 90, 103);
        --orange: rgb(244, 191, 150);
        --white: rgb(252, 245, 237)
    }
`;
