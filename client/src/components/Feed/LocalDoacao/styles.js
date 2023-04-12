import styled from 'styled-components'
import * as palette from "../../../utils/variablesColor"

export const Container = styled.div`
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
        height: 100vh;
    }
    
`