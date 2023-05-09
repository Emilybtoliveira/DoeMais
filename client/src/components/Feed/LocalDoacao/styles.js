import styled from 'styled-components'
import * as palette from "../../../utils/variablesColor"
import { Card } from '@mui/material'

export const Container = styled.div`
margin: 1%;
     @media (max-width: 768px) {
        margin-top: 10%;
    }
    @media (max-width: 768px) {
            justify-content: center;
            h1{
                font-size: 30px;
                text-align: center;
            }
            h4{
                font-size: 15px;
                text-align: center;
            }
    }
    h1{
        color: #404040;
    }
    h4{
        color: #404040;
        font-weight: lighter;
    }
    h3{
        color: ${palette.vermelho}
    }

    .local{
        display: flex;
        justify-content: start;
        align-items: center;
    }
    .map{
        height: 50vh;
        width: 100%;
        margin-top: 2%;
        border: 1px solid #ccc;
        box-shadow: 0px 0px 30px rgba(255, 0, 0, 0.3);
    }
    .mapInfo{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 80vw;
        
    }
    
`



export const CardLocal = styled(Card)`
    .content:hover{
        border: 0.3px solid rgba(204, 0, 0, 0.5);
    }
`