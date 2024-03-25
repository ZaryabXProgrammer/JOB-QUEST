

import {css} from "styled-components";

export const mobile = (props) => {
    return css `
         @media only screen and (max-width: 375px){
            ${props}
        }
    `;
};

<<<<<<< HEAD
=======


>>>>>>> 68e8a1ef40efdfad6f1223c8349efd24321e29bb
export const tablet = (props) => {
    return css`
    
    @media only screen and (max-width: 540px){
        ${props}
    }
    
    `
}