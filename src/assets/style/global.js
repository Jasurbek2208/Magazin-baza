import { createGlobalStyle } from "styled-components";

import "./fontAwesome.css";
import "./icon.css";
import "./fonts.css";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }

    .container {
        margin: 0 auto;
        padding: 0px 16px;
        max-width: 1200px;
        /* border: 1px solid red; */
    }

    /* SCROLLBAR STYLE */
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`