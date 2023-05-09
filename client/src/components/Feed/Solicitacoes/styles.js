import styled from 'styled-components'
import * as palette from "../../../utils/variablesColor"

export const Container = styled.div`
     /* display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column; */
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
    .vazio{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 80vh;

        img{
            width: 8%;
        }
        h4{
            margin-top: 1%;
            font-weight: 600;
        }
        h5{
            color: ${palette.vermelho};
            margin-top: 1%;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .local{
        display: flex;
        justify-content: end;
        align-items: end;
    }
    .grid{
        margin-top: 3%;
        display: flex;
        @media (max-width: 768px) {
            margin-left: 2%;
            padding: 0;
        }
    }
`