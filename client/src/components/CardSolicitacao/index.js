import React from 'react';
import { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardPrincipal } from './styles';
import img1 from '../../assets/Portal/CardsEstatico/img1.svg';
import img2 from '../../assets/Portal/CardsEstatico/img2.svg';
import img3 from '../../assets/Portal/CardsEstatico/img3.svg';
import wallpaperDoeMais from  '../../assets/wallpaperDoeMais.svg'
import hospital from '../../assets/Portal/CardsEstatico/hospital.svg';
import local from '../../assets/Portal/CardsEstatico/local.svg';


function Cards(props) {
  const {solicitacao} = props; 
    return(
            <CardPrincipal sx={{ borderRadius: 3 }}>
            <CardMedia sx={{ height: 300, width: 'auto' }} image={solicitacao.person.picture? solicitacao.person.picture: wallpaperDoeMais } />
            <CardContent sx={{ paddingBottom: 1 }}>
              <Typography gutterBottom variant="h5" component="div" className="title">
                {solicitacao.person.name}  {solicitacao.person.idade?solicitacao.person.idade: ''} 
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                {solicitacao.person.description?solicitacao.person.description: '#AjudeQuemPrecisa'}
              </Typography>
              <div className="informacoes">
                <div>
                  <div className="icones">
                    <img src={local} alt="local" />
                    <Typography variant="h6" color="text.secondary" className="info">
                {solicitacao.person.city?solicitacao.person.city :  'Não informado'} {solicitacao.person.estado? ','+solicitacao.person.estado:''}
                  </Typography>
                  </div>
                  <div className='icones' >
                    <img src={hospital} alt='hospital'/>
                    <Typography variant="h6" color="text.secondary" className='info'>
                    {solicitacao.person.hospital?solicitacao.person.hospital:'Não informado'}
                  </Typography>
                  </div>
                </div>
                <Typography variant="h4" className='tipo'>{solicitacao.person.bloodtype}</Typography>
              </div>
                <Typography variant="body2" className='publicado'>Publicado em {solicitacao.creation_date}</Typography>
            </CardContent>
            
          </CardPrincipal>
    )
      
}

export default Cards
