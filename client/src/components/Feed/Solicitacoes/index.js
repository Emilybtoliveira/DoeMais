import React, { Component } from 'react'
import {Grid}from '@mui/material';
import {Container} from './styles'
import Card from '../../CardSolicitacao'
import img1 from '../../../assets/Portal/CardsEstatico/img1.svg'
import api from '../../../services/api'
import {useSelector} from 'react-redux'



export default function Solicitacoes () {

  const [solicitacoes, setSolicitacoes] = React.useState([])
  const [cidade, setCidade] = React.useState('')
  const [coordenadas, setCoordenadas] = React.useState({lon: '', lat: ''})
  const id_user = useSelector(state => state.user.id_user);
  const location = useSelector(state => state.user.location);



  
const buscarCidade = async (query) => {
  if(location){
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`;

    try {
      const resposta = await fetch(url);
      const data = await resposta.json();
      setCidade(data.address.city)
    } catch (error) {
      console.error(error);
    }
  }
}
React.useEffect(() => {
  buscarCidade()
}, [])


React.useEffect(() => {
  // if(cidade){
    console.log(cidade)
    const response = api.get(`/solicitations/feed?userId=${id_user}`).then(response => {
      setSolicitacoes(response.data.data)
    }).catch(err => {
      console.log(err)
    })
  // }
}, [])



  return (
      <Container>

        <h1>Solicitações para doação</h1>
        <h4>Ajude pessoas que estão precisando de doação próximos a você!</h4>
        <div >
          <Grid container spacing={ 2} rowSpacing={0} className='grid'>
            {solicitacoes.map((item,i) =>(
              <Grid item key={i}  xs={12} md={6}  xl={4}  >
                <Card solicitacao={item}/>
              </Grid>            
          ))}
          </Grid>
        </div>
      </Container>
    )
}


