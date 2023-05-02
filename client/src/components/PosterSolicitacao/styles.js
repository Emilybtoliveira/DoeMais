import styled from 'styled-components';
import * as palette from "../../utils/variablesColor"


export const Container = styled.div`
   
    display: flex;
    /* justify-content: center; */
    .paper{
        background-color: ${palette.branco} ;
        width: 30vw;
        height: 80vh;
        margin-bottom: 2%   ;
        padding: 2%;
        padding-bottom: 6%;
        .acesse{
            font-size: 0.6em;
            text-align: center;
            margin: 1% 0;
            font-family: 'Radio Canada', sans-serif;
            color: rgba(64, 64, 64, 0.9);
            span{
                color: ${palette.vermelho};
            } 
        }
    }
    .botoes{
        display: flex;
        flex-direction: column;
    }
    
`

export const Content = styled.div`
    border: 3px solid ${palette.vermelho};
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;    
    padding: 1%;

    .titulo{
        /* font-size: 1.6em; */
        color: ${palette.vermelho};
        font-family: 'Cagliostro', sans-serif;
        margin: 2% 0;
        width: 100%;
        text-align: center;
    }
    h2{
        font-size: 1em;
        font-family: 'Ropa Sans ', sans-serif;
    }
    h3{
        font-size: 0.9em;
        font-family: 'Ropa Sans ', sans-serif;
    }
    h4{
        font-size: 0.9em;
        font-family: 'Radio Canada', sans-serif;
        font-weight: 600;
    }
    p{
        font-size: 0.9em;
        font-family: 'Radio Canada', sans-serif;
        font-weight: 600;
        color: rgba(64, 64, 64, 0.9);
        text-align: justify;
        /* width: 70%; */
    }
    .tipo{
        font-size: 2em;
        margin-bottom: 0;
        color:  ${palette.vermelho};

    }
    .hash{
        font-size: 1em;
        margin-bottom: 0;
        color:  ${palette.vermelho};
    }
    
`