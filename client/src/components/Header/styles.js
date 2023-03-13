import styled from 'styled-components'
import AppBar from '@mui/material/AppBar';
import * as palette from "../../utils/variablesColor"

export const Bar = styled(AppBar)`
    margin-top: 1%;
    .toolbar{
        display: flex;
        justify-content: space-between;
    }
    .menu{
        display: flex;
        width: 20%;
        @media (max-width: 720px) {
            width: 50%;
        }
    }
    .link{
        color: ${palette.preto};
        margin-right: 15%;
        text-decoration: none;
    }
    h3{
        font-family: 'Cagliostro', sans-serif;
        @media (max-width: 720px) {
            font-size: 0.8em;
        }
    }
    .logo{
        @media (max-width: 720px) {
            width: 50%;
        }
    }
`