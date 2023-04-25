import styled from 'styled-components'
import * as palette from "../../../utils/variablesColor"

export const Container = styled.div`

    h1{
        color: #404040;
    }
    h4{
        color: #404040;
        font-weight: lighter;
    }
    .button{
        background-color: ${palette.vermelho};
        margin-right: 5%;
        width:140px;
        font-weight: 700;
        height: 40px;
    }
    .button:hover{
        background-color: rgba(204, 0, 0, 0.59);
    }
    .add{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
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
    }
    .grid{
        margin-top: 3%;
        display: flex;
        @media (max-width: 768px) {
            margin-left: 2%;
            padding: 0;
        }
    }
    @media (max-width: 768px) {
        margin-top: 10%;
    }

`