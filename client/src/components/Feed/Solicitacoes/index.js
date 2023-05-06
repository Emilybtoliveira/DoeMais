import React, { Component } from 'react'
import {Grid}from '@mui/material';
import {Container} from './styles'
import Card from '../../CardSolicitacao'
import clinica from '../../../assets/Feed/clinica.svg'
import api from '../../../services/api'
import {useSelector, useDispatch} from 'react-redux'
import { Cidade } from '../../../store/actions/userActions';
import {Link} from 'react-router-dom'



export default function Solicitacoes () {
  const dispatch = useDispatch() 
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
      dispatch(Cidade(data.address.city))
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
  if(cidade){
    const response = api.get(`/solicitations/feed?city=${cidade}&userId=${id_user}`).then(response => {
      setSolicitacoes(response.data.data)
    }).catch(err => {
      console.log(err)
    })
  }
}, [cidade])



  return (
      <Container>

        <h1>Solicitações para doação</h1>
        <h4>Ajude pessoas que estão precisando de doação próximos a você!</h4>
        {/*<Link to='/locais-doacao' style={{color: 'rgba(204, 0, 0, 1)'}} >
          <div className='local'>
            <img src={clinica} alt='local de doação' width='3%' />
            <h3>Locais de doação próximos</h3>
          </div>
        </Link>*/}
        <div >
          <Grid container spacing={ 2} rowSpacing={0} className='grid'>
            {solicitacoes.map((item,i) =>(
              <Grid item key={i} xs={12} sm={12} md={6} lg={4} xl={3}>
                <Card  solicitacao={item}/>
              </Grid>            
          ))}
          </Grid>
        </div>
      </Container>
    )
}


