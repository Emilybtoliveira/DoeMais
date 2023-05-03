import React from 'react'
import {Container} from './styles'
import Header from '../../components/Header'
import FormCadastroAdmin from '../../components/FormCadastroAdmin'

function CadastroAdmin (){
    
    return(
        <div style={{overflowX: 'hidden'}}>
        <Header/>
        <Container>
            <FormCadastroAdmin/>    
        </Container>
        </div>
        
    )
}

export default CadastroAdmin