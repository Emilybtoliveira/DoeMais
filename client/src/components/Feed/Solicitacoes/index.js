import React, { Component } from 'react'
import {Grid, Tooltip}from '@mui/material';
import {Container} from './styles'
import Card from '../../CardSolicitacao'
import clinica from '../../../assets/Feed/clinica.svg'
import api from '../../../services/api'
import {useSelector, useDispatch} from 'react-redux'
import { Cidade } from '../../../store/actions/userActions';
import {Link} from 'react-router-dom'
import vazio from '../../../assets/Feed/vazio.svg'
import CircularProgress from '@mui/material/CircularProgress';


export default function Solicitacoes () {
  const dispatch = useDispatch() 
  const [solicitacoes, setSolicitacoes] = React.useState([])
  const [all_solicitacoes, setAllSolicitacoes] = React.useState(false)
  const [cidade, setCidade] = React.useState('')
  const [coordenadas, setCoordenadas] = React.useState({lon: '', lat: ''})
  const id_user = useSelector(state => state.user.id_user);
  const location = useSelector(state => state.user.location);
  const [isLoading, setIsLoading] = React.useState(true);



  
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
  }else{
    const response = api.get(`/solicitations/feed?userId=${id_user}`).then(response => {
      setSolicitacoes(response.data.data)
    }).catch(err => {
      console.log(err)
    })
  }
}, [cidade])


React.useEffect(() => {
  if(all_solicitacoes){
    console.log("entrou")
    const response = api.get(`solicitations`).then(response => {
      setSolicitacoes(response.data.data)
    }).catch(err => {
      console.log(err)
    })
  }
   
}, [all_solicitacoes])

React.useEffect(() => {
  setTimeout(() => {
    setIsLoading(false);
  }, 400);
}, []);

  return (
      <Container>
        <div style={{width: '100%'}} >
          <h1>Solicitações para doação</h1>
          <h4>Ajude pessoas que estão precisando de doação próximos a você!</h4>
          {/*<Link to='/locais-doacao' style={{color: 'rgba(204, 0, 0, 1)'}} >
          <div className='local'>
            <img src={clinica} alt='local de doação' width='3%' />
            <h3>Locais de doação próximos</h3>
          </div>
          </Link>*/}
        </div>
        
        <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress style={{ color: 'red' }}/>
        </div>
      ) : (
        solicitacoes.length !== 0 ? (
          <Grid container spacing={2} rowSpacing={0} className='grid'>
            {solicitacoes.map((item, i) => (
              <Grid item key={i} xs={12} sm={12} md={6} lg={4} xl={3}>
                <Card solicitacao={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className='vazio'>
            {/* {all_solicitacoes? alert('Ainda não temos solicitações cadastradas.')  : '' } */}
            <img src={vazio} alt='sem solicitações'/>
            <h4>O feed ainda não possui solicitações compatíveis com seu tipo sanguíneo ou cidade.</h4>
            <Tooltip title={all_solicitacoes? 'Ainda não temos solicitações cadastradas :(': 'Ver'} >
              <h5 onClick={() => setAllSolicitacoes(true)}>Desejo ver solicitações sem ser do meu tipo sanguíneo ou cidade.</h5>
            </Tooltip>
          </div>
        )
      )}
    </div>
      </Container>
    )
}


