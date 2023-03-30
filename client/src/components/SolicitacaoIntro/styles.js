import styled from 'styled-components'
import * as palette from "../../utils/variablesColor"

export const Container = styled.div`
   
    padding: 4%;
    background-color: rgba(197, 23, 23, 0.06);
    @media (max-width: 720px) {
        flex-direction: column;
        justify-content: start;
        margin-top: 10%;
    }
    h1{
        font-family: 'Ropa Sans', sans-serif;
        font-size: 2.3em;
        @media (max-width: 720px) {
            text-align: center;
            font-size: 2.7em;
        }
    }
    h3{
        font-family: 'Radio Canada', sans-serif;
        /* font-weight: 400; */
        color:rgba(0, 0, 0, 0.77);
        @media (max-width: 720px) {
            text-align: justify;
            font-size: 1.5em;
        }
    }
    h2{
        font-family: 'Ropa Sans', sans-serif;
        font-size: 2.3em;
        color: ${palette.vermelho};

        width: 30%;
        @media (max-width: 720px) {
            text-align: center;
            font-size: 2.7em;
            width: 100%;

        }
    }
    .text{
        width: 40%;
        @media (max-width: 720px) {
            width: 90%;
    }
    }
    .desc{
        display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 4% 0%;
        @media (max-width: 720px) {
        flex-direction: column;
        justify-content: start;

        margin-top: 5%;}
    }
`
    