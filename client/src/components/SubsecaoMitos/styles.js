import styled from 'styled-components'

export const Textos = styled.div`
margin: auto;
background-color: rgba(197, 23, 23, 0.06);
width: 98%;
border: 2px solid rgba(204, 0, 0, 0.2);
border-radius:30px 55px;
    ul{
        padding:0% 5% 1% 5%;
    }

    ul li::marker{
        color: rgba(204, 0, 0, 100);
        content: "X ";
        font-size: 1.5em;
        font-weight: 1000;
    }
    ul li{
        padding-bottom:4%
    }
    
`
