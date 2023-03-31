import React from 'react';
import {Container} from './styles'
import Cards from '../CardSolicitacao'
import {Grid}from '@mui/material';

import img1 from '../../assets/Portal/CardsEstatico/img1.svg';
import img2 from '../../assets/Portal/CardsEstatico/img2.svg';
import img3 from '../../assets/Portal/CardsEstatico/img3.svg';


const solicitacao = [
    {
        picture: img1,
        name: 'Nicolas Lima da Silva',
        idade: '- 32 anos',
        description:
          'Se você é doador de sangue ou conhece alguém que é, por favor, considere a possibilidade de doar sangue. A sua doação pode salvar a vida dessa pessoa querida e trazer esperança para toda a família.',
        city: 'Maceió',
        estado: 'Alagoas',
        hospital: 'Hospital Santa Fé',
        bloodtype: 'A+',
      creation_date: '14/02/2023',
    },
  
    {
        picture: img2,
        name: 'Paulo Oliveira da Silva',
        idade: '- 30 anos',
        description:
          'Alguém que eu amo muito precisa urgentemente de uma transfusão de sangue do tipo O-. As doações desse tipo sanguíneo estão muito baixas e a situação é crítica. Preciso de ajuda!',
        city: 'Maceió',
        estado: 'Alagoas',
        hospital: 'Hospital Santa Fé',
        bloodtype: 'O-',

      creation_date: '14/02/2023',
    },
  
    {
        picture: img3,
        name: 'José Lima da Silva',
        idade: '- 64 anos',
        description:
          'O meu avô está passando por um momento difícil e precisa urgentemente de doações de sangue do tipo O-. ',
        city: 'Maceió',
        estado: 'Alagoas',
        hospital: 'Hospital Santa Fé',

      bloodtype: 'O-',
      creation_date: '14/02/2023',
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
