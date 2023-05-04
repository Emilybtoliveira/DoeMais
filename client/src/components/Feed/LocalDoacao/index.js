import React, {  useEffect, useState  } from 'react'
import {Grid}from '@mui/material';
import {Container, CardLocal} from './styles'
import clinica from '../../../assets/Feed/clinica.svg'
import {useSelector} from 'react-redux'
import { Card, CardContent, Typography } from '@mui/material';
import pin from '../../../assets/location-pin.png'
import {Link} from 'react-router-dom'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';  
export default function Mapa () {
  
  const [bloodBanks, setBloodBanks] = useState([]);
  const location = useSelector(state => state.user.location);
  const cidade = useSelector(state => state.user.cidade);
  const [lat, setLat] = useState(location.latitude);
  const [lng, setLng] = useState(location.longitude);
  const [isActive, setIsActive] = useState(false);


  const handleCardClick = (local) => {
    setIsActive(!isActive);
    setLat(local.lat)
    setLng(local.lng)
    
  };


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
  


    
  const BloodBankInfoCard = ({ name, address, opening_hours, local }) => (
    <CardLocal variant="outlined" onClick={() => handleCardClick(local)}  sx={{cursor: 'pointer'}}>
      <CardContent className='content' >
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
    </CardLocal>
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
                  lat: lat,
                  lng: lng
                }}
                zoom={18}
            
              >
                {bloodBanks.map((bloodBank) => (
                <Marker
                  key={bloodBank.name}
                  position={{
                    lat: bloodBank.location.lat,
                    lng: bloodBank.location.lng
                  }}
                  title={bloodBank.name}
                  onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bloodBank.name)}`;
                    window.open(url, '_blank');
                  }}
                >
                  
                </Marker>
                
            ))}
            </GoogleMap>
          </div>
          <Grid container spacing={2} sx={{mt: '2%'}}>
            {console.log(bloodBanks)}
            {bloodBanks.map((bloodBank) => (
                <Grid item xs={12} md={6} key={bloodBank.name}>
                  <BloodBankInfoCard
                  name={bloodBank.name}
                  address={bloodBank.address}
                  opening_hours={bloodBank.opening_hours}
                  local = {bloodBank.location}
                />
                </Grid>
            ))}
            </Grid>
        </div>
      </Container>
    )
}


