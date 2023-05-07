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
    .button{
        background-color: ${palette.vermelho};
        margin-right: 5%;
        width: 50px;
        height: 50px;
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

export const ContentModal = styled.div`
    position: absolute;
    width: 70%;
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
