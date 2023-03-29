import React from 'react';
import {Container} from './styles'
import Cards from '../CardSolicitacao'
import {Grid}from '@mui/material';

import img1 from '../../assets/Portal/CardsEstatico/img1.svg';
import img2 from '../../assets/Portal/CardsEstatico/img2.svg';
import img3 from '../../assets/Portal/CardsEstatico/img3.svg';


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


function Portal (){
    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
    return(
        <Container>
            <div className='desc' >
                <div className='text' >
                    <h1>Solicitantes de doação </h1>
                    <h3>Nosso objetivo é ajudar na divulgação das pessoas que necessitam de doação sanguínea. Aqui você pode divulgar um pedido de doação ou ajudar quem precisa.</h3>
                </div>
                <h2>#AjudeQuemPrecisa</h2>
            </div>
            <div>
              {isMobile?<Cards solicitacao={solicitacao[0]}/>: 
            <Grid  container spacing={4}>
                {solicitacao.map((solic,i) => {
                     return (
                        <Grid key={i} item xs={12} md={4}>
                            <Cards solicitacao={solic}/>
                        </Grid>
                    )})}
            </Grid>}
            </div>
        </Container>
    )
}

export default Portal
