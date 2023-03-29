import React, { Component } from 'react'
import {Typography}from '@mui/material';
import {Container} from './styles'
import Card from '../../CardSolicitacao'
import img1 from '../../../assets/Portal/CardsEstatico/img1.svg'


const solicitacao = [
  {
    img: img1,
    nome: 'José Lima da Silva',
    idade: 30,
    descricao:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    cidade: 'Maceió',
    estado: 'Alagoas',
    hospital: 'Hospital Santa Fé',
    publicado: '14/02/2023',
    tipo_sanguineo: 'O-',
    hora_publicacao: '16',
  },

  {
    img: img1,
    nome: 'José Lima da Silva',
    idade: 30,
    descricao:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    cidade: 'Maceió',
    estado: 'Alagoas',
    hospital: 'Hospital Santa Fé',
    publicado: '14/02/2023',
    tipo_sanguineo: 'O-',
    hora_publicacao: '16',
  },

  {
    img: img1,
    nome: 'José Lima da Silva',
    idade: 30,
    descricao:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    cidade: 'Maceió',
    estado: 'Alagoas',
    hospital: 'Hospital Santa Fé',
    publicado: '14/02/2023',
    tipo_sanguineo: 'O-',
    hora_publicacao: '16',
  },
];

export default function Solicitacoes () {
    return (
      <Container>
        <h1>Solicitações para doação</h1>
        <h4>Ajude pessoas que estão precisando de doação próximos a você!</h4>

      </Container>
    )
}


