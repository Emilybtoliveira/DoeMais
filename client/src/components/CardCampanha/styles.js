import styled from 'styled-components'
import * as palette from "../../utils/variablesColor"
import Card from '@mui/material/Card';

export const CardPrincipal = styled(Card)`
    max-width: 350px;
    min-height:585px;
    max-height:585px;
    padding: 15px;
    padding-bottom:0;
    overflow-wrap: break-word;
    display: flex;
    position:relative;
    
    /* justify-content: center; */
    flex-direction: column;
    .title{
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        text-align: center;

    }
    .descricao{
        font-family: 'Radio Canada', sans-serif;
        font-size: 12px;
        font-weight: 700;
        min-height: 100%;
        
        text-align: left;

    }
    .bottominfos{
        position:absolute;
        bottom:0;
        left:25%;
        font-size:12px;

        
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
      
    }
    .informacoes{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .publicado{
        text-align: center;
        font-family: 'Radio Canada', sans-serif;
        font-weight: 700;
        margin: 3px;
        color: rgba(64, 64, 64, 0.7);

    }
    @media (max-width: 720px) {
        .title{
            font-size:14px;
        }
        .bottominfos{
            font-size:10px;
        }
        .descricao{
            font-size:12px;
        }
    }
  
`

export const ContentModal = styled.div`
    position: absolute;
    width: 80%;
    max-width:500px;
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