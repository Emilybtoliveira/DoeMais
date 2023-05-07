import React from 'react'
import {Typography}from '@mui/material';
import Header from '../../components/Header';
import Rodape from '../../components/Rodape'; 
import PosterSolicitacao from '../../components/PosterSolicitacao';
import {Container} from './styles'


export default function Solicitacoes () {
    
  return (
      <Container>
        <Header/>
        <PosterSolicitacao/>
        <Rodape/>
      </Container>
    )
}


