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
import hospital from '../../assets/Portal/CardsEstatico/hospital.svg';
import local from '../../assets/Portal/CardsEstatico/local.svg';


function Cards(props) {
  const {solicitacao} = props; 
    return(
            <CardPrincipal sx={{ borderRadius: 3 }}>
            <CardMedia sx={{ height: 200, width: 'auto' }} image={solicitacao.img} />
            <CardContent sx={{ paddingBottom: 1 }}>
              <Typography gutterBottom variant="h5" component="div" className="title">
                {solicitacao.nome} - {solicitacao.idade} anos
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                {solicitacao.descricao}
              </Typography>
              <div className="informacoes">
                <div>
                  <div className="icones">
                    <img src={local} alt="local" />
                    <Typography variant="h6" color="text.secondary" className="info">
                {solicitacao.cidade}, {solicitacao.estado}
                  </Typography>
                  </div>
                  <div className='icones' >
                    <img src={hospital} alt='hospital'/>
                    <Typography variant="h6" color="text.secondary" className='info'>
                    {solicitacao.hospital}
                  </Typography>
                  </div>
                </div>
                <Typography variant="h4" className='tipo'>{solicitacao.tipo_sanguineo}</Typography>
              </div>
                <Typography variant="body2" className='publicado'>Publicado em {solicitacao.publicado} às {solicitacao.hora_publicacao}h </Typography>
            </CardContent>
            
          </CardPrincipal>
    )
      
}

export default Cards
