import styled from 'styled-components'
import * as palette from "../../utils/variablesColor"

export const Container = styled.div`

    background-color: #fff;
    max-width: 500px;
    width: 500px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 15px;
    align-items: center;
    border-radius: 20px;
    overflow-y: auto;
    overflow-x: hidden;

    @media (max-width: 720px) {
    width: 90%;
        
    }
    h1{
        font-family: 'Poppins', sans-serif;
        margin: 3%;
    }
    .button{
        margin-top: 5%;
        background-color: ${palette.vermelho};
        color: #fff;
    }
    .button:hover{
        background:rgba(197, 23, 23, 0.81);
    }
`