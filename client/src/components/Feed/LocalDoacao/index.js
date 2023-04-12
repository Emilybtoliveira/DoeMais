import React, {  useEffect, useState  } from 'react'
import {Grid}from '@mui/material';
import {Container} from './styles'
import Card from '../../CardSolicitacao'
import clinica from '../../../assets/Feed/clinica.svg'
import api from '../../../services/api'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


  
export default function Mapa () {
  
  const [solicitacoes, setSolicitacoes] = React.useState([])
  const [cidade, setCidade] = React.useState('')
  const [coordenadas, setCoordenadas] = React.useState({lon: '', lat: ''})
  const id_user = useSelector(state => state.user.id_user);
  const location = useSelector(state => state.user.location);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBrUgToz1PMTBYHJ1tXp6tUAmQGFAWX34w"
  })




  return (
      <Container>
          <div className='local'>
            <img src={clinica} alt='local de doação' width='3%' />
            <h1>Locais de doação próximos  a você</h1>
          </div>
        <h4>Encontre um banco de sangue e faça a sua parte!</h4>
        <div className='map' >
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{width: '100%', height: '100%'}}
              center={{
                lat: location.latitude,
                lng: location.longitude
              }}
              zoom={15}
           
            >
              { /* Child components, such as markers, info windows, etc. */ }
              <></>
            </GoogleMap>
  ) : <></>}
        </div>
      </Container>
    )
}


