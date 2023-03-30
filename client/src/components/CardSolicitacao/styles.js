import styled from 'styled-components'
import * as palette from "../../utils/variablesColor"
import Card from '@mui/material/Card';

export const CardPrincipal = styled(Card)`
    max-width: 90%;
    /* max-height: 70%; */
    padding: 15px;
    padding-bottom:0;
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    .title{
        font-family: 'Poppins', sans-serif;
        font-size: 1em;
        text-align: center;
        @media (max-width: 720px) {
            font-size: 19px;
        }
    }
    .descricao{
        font-family: 'Radio Canada', sans-serif;
        font-size: 0.8em;
        font-weight: 700;
        min-height: 100%;
        
        text-align: justify;
        @media (max-width: 720px) {
            font-size: 15px;
        }
    }
    .icones{
        display: flex;
        align-items: center;
    }
    .info{
        font-family: 'Radio Canada', sans-serif;
        font-weight: 700;
        text-align: justify;
        font-size: 0.7em;
        margin-left: 3px;
        @media (max-width: 720px) {
            font-size: 13px;
        }
    }
    .informacoes{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .tipo{
        color: ${palette.vermelho};
        font-size: 25px;
        @media (max-width: 720px) {
            font-size: 25px;
        }
    }
    .publicado{
        text-align: center;
        font-family: 'Radio Canada', sans-serif;
        font-weight: 700;
        margin: 3px;
        color: rgba(64, 64, 64, 0.7);
        @media (max-width: 720px) {
            font-size: 13px;
        }
    }
  
`

export const ContentModal = styled.div`
    position: absolute;
    width: 50%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 16px;
    h1,h4{
        color: #404040;
    }
`