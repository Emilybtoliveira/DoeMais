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
        width: 48px;
        height: 42px;
        border-radius:15px;
    }
    .button:hover{
        background-color: rgba(204, 0, 0, 0.59);
    }
    .headers{
        padding-bottom:3%;
    }
    @media(max-width: 850px) {
        padding-top:10%
       }
    

`

export const List = styled.div`
  margin-top:1%;
  height:500px;
  box-shadow:  4px 4px 4px rgba(0, 0, 0, 0.25);
  overflow-y:scroll;
  
 

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
