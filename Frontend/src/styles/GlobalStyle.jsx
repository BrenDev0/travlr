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
        --red: rgb(250, 112, 112);
        --white: rgb(254, 253, 237);
        --light-green: rgb(198, 235, 197);
        --green: rgb(161, 195, 152)
    }
`;
