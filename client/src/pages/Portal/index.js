import React from 'react';
import {Container} from './styles'
import Header from '../../components/Header'
import Introducao from '../../components/Introducao'
import Solicitacao from '../../components/SolicitacaoIntro'
function Portal (){
    return(
        <Container>
            <Header/>
            <Introducao/>
            <Solicitacao/>
        </Container>
    )
}

export default Portal
