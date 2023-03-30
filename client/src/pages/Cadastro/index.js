import React from 'react'
import {Container} from './styles'
import Header from '../../components/Header'
import FormCadastro from '../../components/FormCadastro'


function Cadastro (){
    
    return(
        <div style={{overflowX: 'hidden'}}>
        <Header/>
        <Container>
            <FormCadastro/>    
        </Container>
        </div>
        
    )
}

export default Cadastro