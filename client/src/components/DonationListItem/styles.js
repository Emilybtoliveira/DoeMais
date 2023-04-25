import styled from 'styled-components'
import * as palette from "../../utils/variablesColor"

export const Textos = styled.div`
height:72px;
width:100%;
background-color: rgba(64,64,64,0.1);
padding-right:3%;
display: flex;
align-items: left;
border-bottom: 1px solid black;

.first{
    display: flex;
    align-items: center;
}

.icon{
    padding:35%;
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