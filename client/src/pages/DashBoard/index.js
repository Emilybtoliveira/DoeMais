import React from 'react'
import {Container} from './styles'
import Header from '../../components/Header'
import FormCadastro from '../../components/FormCadastro'


function Cadastro (){
    
    return(
        <div style={{overflowX: 'hidden'}}>
        <Header/>
        <Container>
            <h1>LOGADA!</h1>  
        </Container>
        </div>
        
    )
}

export default Cadastro