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
        font-size: 1.1rem;
        color: var(--black);
        ;
        
        
    }

 html, body{
    background: var(--white);
    width: 100%;
    height: 100%;
    
    
 }
    

    #root{
    width: 100%;
    height: 100%;

        
    }


    :root {
        --red: #ca1f3d;
        --orange: #ffbe00;
        --white: #ffffff;
        --gray: #f7f0f0;
        --black: #25182e;
    
    }
`;
