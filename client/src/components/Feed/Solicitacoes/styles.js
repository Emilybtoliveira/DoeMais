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
    
    
    .float-child {
        width: 50%;
        float: left;
        margin-top: 1%;  
    }  
    .float-child:last-child{
        text-align: right;
    }
    img{
        padding-right 2%;
        vertical-align: middle;
        padding-bottom 1%;
    }
    a{
        color: rgba(204, 0, 0, 0.69)
    }
    
`