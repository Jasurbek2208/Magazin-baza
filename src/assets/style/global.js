import { createGlobalStyle } from "styled-components";

import "./fontAwesome.css";
import "./icon.css";
import "./fonts.css";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        list-style: none;
        text-decoration: none;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }

    .container {
        margin: 0 auto;
        padding: 0px 16px;
        max-width: 1200px;
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

    /* ANIMATIONS  */
    @keyframes modalOpening {
        0% {
        left: -1000px;
        }
        100% {
        left: 0;
        }
    }

    @keyframes modalClosing {
        0% {
        left: 0;
        }
        100% {
        left: -1000px;
        }
    }
    @keyframes modalOpeningStaticPosition {
        0% {
        margin-left: -1000px;
        }
        100% {
        margin-left: 0;
        }
    }

    @keyframes modalClosingStaticPosition {
        0% {
        margin-left: 0;
        }
        100% {
        margin-left: -1000px;
        }
    }
`