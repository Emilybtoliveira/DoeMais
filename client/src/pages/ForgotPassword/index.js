import React from 'react'
import {Container} from './styles'
import Header from '../../components/Header'
import FormForgotPassword from '../../components/FormForgotPassword'


function Cadastro (){
    
    return(
        <div style={{overflowX: 'hidden'}}>
        <Header/>
        <Container>
            <FormForgotPassword/>
        </Container>
        </div>
        
    )
}

export default Cadastro