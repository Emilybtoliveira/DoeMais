import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {Container} from './styles'
import Header from '../../components/Header'
import FormRecoverPassword from '../../components/FormRecoverPassword'

function Cadastro (){

    return (
        <div style={{overflowX: 'hidden'}}>
            <Header/>
            <Container>
                <FormRecoverPassword/>
            </Container>
        </div>
    )
}

export default Cadastro