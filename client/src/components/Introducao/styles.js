import styled from 'styled-components'
import * as palette from "../../utils/variablesColor"

export const Container = styled.div`
    /* height:80vh; */
    padding: 5% 0;
    display:flex;
    justify-content: space-around;
    align-items: center;

    .iconeMobile{
        display: none;
        @media (max-width: 720px) {
            display: flex;
            width:30%;
            margin-bottom: 5%;
        }
    }
    .trio{
        width:40%;
        @media (max-width: 720px) {
            display: none;
        }
    }
    @media (max-width: 720px) {
        flex-direction: column;
        justify-content: start;
        margin-top: 10%;
    }
`


export const Textos = styled.div`
    width:40%;
    @media (max-width: 720px) {
        width:90%;
    }
    h1{
        color: ${palette.vermelho};
        font-family: 'Port Lligat Sans', sans-serif;
        font-size: 5em;
        @media (max-width: 720px) {
            font-size: 4em;
            text-align: center;
        }
    }

    h2{
        color: rgba(64, 64, 64, 0.9);
        font-family: 'Radio Canada', sans-serif ;
        @media (max-width: 720px) {
            font-size: 1.2em;
            text-align: center;
        }
    }
    .btn{
        @media (max-width: 720px) {
            margin-top: 5%;
            display: flex;
            justify-content: center;
        }
    }
    .botao{
        background: ${palette.vermelho};
        width: 40%;
        margin-top: 5%;
        line-height: 3.8vh;
        font-family: 'Radio Canada', sans-serif ;
        font-size: 1.3em;
        text-transform: capitalize;
        @media (max-width: 720px) {
            width: 50%;
        }
        
    }
    .botao:hover{
        background:rgba(197, 23, 23, 0.81);
    }
    
    
`