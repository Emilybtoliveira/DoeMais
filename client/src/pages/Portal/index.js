import React from 'react';
import {Container} from './styles'
import Header from '../../components/Header'
import Introducao from '../../components/Introducao'

function Portal (){
    return(
        <Container>
            <Header/>
            <Introducao/>
        </Container>
    )
}

export default Portal
