import React from 'react'
import {Container} from './styles'
import Header from '../../components/Header'
import FormLogin from '../../components/FormLogin'
import { Link } from 'react-router-dom'

function Cadastro (){
    
    return(
        <div style={{overflowX: 'hidden'}}>
        <Header/>
        <Container>
            <FormLogin/>
        </Container>
        </div>
        
    )
}

export default Cadastro