import styled from 'styled-components'
import * as palette from "../../utils/variablesColor"
import Card from '@mui/material/Card';

export const CardPrincipal = styled(Card)`
    max-width: 345px;
    padding: 15px;
    padding-bottom:0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .title{
        font-family: 'Poppins', sans-serif;
        font-size: 1.2em;
        text-align: center;
    }
    .descricao{
        font-family: 'Radio Canada', sans-serif;
        font-weight: 700;
        text-align: justify;
    }
    .icones{
        display: flex;
        align-items: center;
    }
    .info{
        font-family: 'Radio Canada', sans-serif;
        font-weight: 700;
        text-align: justify;
        font-size: 0.9em;
        margin-left: 3px;
    }
    .informacoes{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .tipo{
        color: ${palette.vermelho}
    }
    .publicado{
        text-align: center;
        font-family: 'Radio Canada', sans-serif;
        font-weight: 700;
        margin: 3px;
        color: rgba(64, 64, 64, 0.7);
    }
`