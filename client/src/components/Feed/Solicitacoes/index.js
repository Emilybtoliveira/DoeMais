import React, { Component } from 'react'
import {Grid}from '@mui/material';
import {Container} from './styles'
import Card from '../../CardSolicitacao'
import img1 from '../../../assets/Portal/CardsEstatico/img1.svg'
import iconlocal from '../../../assets/Feed/locaisproximos_icon.svg'


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
        <div class="float-container">
        <div className='float-child'>
          <h4>Ajude pessoas que estão precisando de doação próximos a você!</h4>
        </div>
        <div className='float-child'>
          <img src={iconlocal}></img>
          <a href=''>Locais de doação próximos</a>
        </div>
        </div>
        <div style={{marginTop: '5%'}} >
          <Grid container spacing={2}>
            {solicitacao.reverse().map((item,i) =>(
              <Grid item key={i} xs={12} md={4}>
                <Card  solicitacao={item}/>
              </Grid>            
))}

          </Grid>
        </div>
      </Container>
    )
}


