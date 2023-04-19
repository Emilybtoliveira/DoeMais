import React, {  useEffect, useState  } from 'react'
import {Grid}from '@mui/material';
import {Container} from './styles'
import clinica from '../../../assets/Feed/clinica.svg'
import {useSelector} from 'react-redux'
import { Card, CardContent, Typography } from '@mui/material';

import {Link} from 'react-router-dom'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';  
export default function Mapa () {
  
  const [bloodBanks, setBloodBanks] = useState([]);
  const location = useSelector(state => state.user.location);
  const cidade = useSelector(state => state.user.cidade);
  
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: "AIzaSyDoT8t5-w6gDslrKC-nw50-wwSNzGfjyyY"
  // })

  const consultaBancoSangue = async () => {
    const map = new window.google.maps.Map(document.createElement("div"));
    
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(
      {
        query: `Banco de Sangue em ${cidade}` ,
        type: ["hospital", "Banco de Sangue","Centro de doação de sangue"],
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
          setBloodBanks(
            results.map((result) => ({
              name: result.name,
              address: result.formatted_address,
              opening_hours: result.opening_hours,
              location: {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng(),
              },
            }))
          );
        }
      }
    );
  }


  useEffect(() => {
    consultaBancoSangue()
  }, []);
  


  
const BloodBankInfoCard = ({ name, address, opening_hours }) => (
  <Card variant="outlined">
    <CardContent>
      {console.log(opening_hours?.open_now)}
      <Typography variant="h5" component="h2">
        {name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {address}
      </Typography>
        {opening_hours?opening_hours.open_now?  
        <Typography variant="body2" color='green' >
          Aberto
        </Typography>
        :
        <Typography variant="body2" color='red'>
          Fechado
        </Typography>
        :
        <Typography variant="body2" color='blue'>
          Não Informado
      </Typography>}
    </CardContent>
  </Card>
);
  
  return (
      <Container>
          <div className='local'>
            <img src={clinica} alt='local de doação' width='3%' />
            <h1>Locais de doação próximos  a você</h1>
          </div>
        <h4>Encontre um banco de sangue e faça a sua parte!</h4>
        <div className='mapInfo' >
          <div className='map' >
              <GoogleMap
                mapContainerStyle={{width: '100%', height: '100%'}}
                center={{
                  lat: location.latitude,
                  lng: location.longitude
                }}
                zoom={13}
            
              >
                {bloodBanks.map((bloodBank) => (
                <Marker
                  key={bloodBank.name}
                  position={{
                    lat: bloodBank.location.lat,
                    lng: bloodBank.location.lng
                  }}
                  icon={<BloodtypeIcon />}
                >
                  
                </Marker>
                
            ))}
            </GoogleMap>
          </div>
          <Grid container spacing={2} sx={{mt: '2%'}}>
            {bloodBanks.map((bloodBank) => (
                <Grid item xs={12} md={6} key={bloodBank.name}>
                  <BloodBankInfoCard
                  name={bloodBank.name}
                  address={bloodBank.address}
                  opening_hours={bloodBank.opening_hours}
                />
                {/* Aqui */}
                </Grid>
            ))}
            </Grid>
        </div>
      </Container>
    )
}


