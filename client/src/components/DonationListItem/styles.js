import styled from 'styled-components'
import * as palette from "../../utils/variablesColor"

export const Textos = styled.div`
height:72px;
width:100%;
background-color: rgba(64,64,64,0.1);
padding-right:3%;
padding-left:3%;
display: flex;
align-items: left;
border-radius: 20px;
box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
margin:1%;


img{
    width:20px;
}

h1{
    white-space: nowrap;
    font-size:1em;
}
h3{
    white-space: nowrap;
}

.solong{
    text-align:right;
}

@media(max-width: 300px) {
    h1{
     font-size: 2em;
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