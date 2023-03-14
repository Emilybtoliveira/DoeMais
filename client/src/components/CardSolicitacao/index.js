import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Slider from 'react-slick';


import { CardPrincipal } from './styles';
import img1 from '../../assets/Portal/CardsEstatico/img1.svg';
import img2 from '../../assets/Portal/CardsEstatico/img2.svg';
import img3 from '../../assets/Portal/CardsEstatico/img3.svg';
import hospital from '../../assets/Portal/CardsEstatico/hospital.svg';
import local from '../../assets/Portal/CardsEstatico/local.svg';

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
    img: img2,
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
    img: img3,
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

function Cards() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider dots={true} infinite={true} speed={500} slidesToShow={3}  slidesToScroll={1}>
      {solicitacao.map((item) => {
        return (
          <CardPrincipal sx={{ borderRadius: 3 }}>
            <CardMedia sx={{ height: 200, width: 'auto' }} image={item.img} />
            <CardContent sx={{ paddingBottom: 1 }}>
              <Typography gutterBottom variant="h5" component="div" className="title">
                {item.nome} - {item.idade} anos
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                {item.descricao}
              </Typography>
              <div className="informacoes">
                <div>
                  <div className="icones">
                    <img src={local} alt="local" />
                    <Typography variant="h6" color="text.secondary" className="info">
                {item.cidade}, {item.estado}
                  </Typography>
                  </div>
                  <div className='icones' >
                    <img src={hospital} alt='hospital'/>
                    <Typography variant="h6" color="text.secondary" className='info'>
                    {item.hospital}
                  </Typography>
                  </div>
                </div>
                <Typography variant="h4" className='tipo'>{item.tipo_sanguineo}</Typography>
              </div>
                <Typography variant="body2" className='publicado'>Publicado em {item.publicado} às {item.hora_publicacao}h </Typography>
            </CardContent>
            
        </CardPrincipal>)
      })}
    </Slider>
      )
}

export default Cards
