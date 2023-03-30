import React, { Component } from 'react'
import {Grid}from '@mui/material';
import {Container} from './styles'
import Card from '../../CardSolicitacao'
import img1 from '../../../assets/Portal/CardsEstatico/img1.svg'
import api from '../../../services/api'
import {useSelector} from 'react-redux'



export default function Solicitacoes () {
  const [solicitacoes, setSolicitacoes] = React.useState([])
  const id_user = useSelector(state => state.user.id_user);
  React.useEffect(() => {
    const response = api.get(`/solicitations/feed?userId=${id_user}`).then(response => {
      setSolicitacoes(response.data.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  
  
  return (
      <Container>
        <h1>Solicitações para doação</h1>
        <h4>Ajude pessoas que estão precisando de doação próximos a você!</h4>
        <div >
          <Grid container spacing={ 2} rowSpacing={0} className='grid'>
            {solicitacoes.map((item,i) =>(
              <Grid item key={i}  xs={12} md={4}  xl={2}  >
                <Card solicitacao={item}/>
              </Grid>            
          ))}
          </Grid>
        </div>
      </Container>
    )
}


