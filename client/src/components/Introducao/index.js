import React from 'react';
import {Container, Textos} from './styles'
import {Button} from '@mui/material';
import trio from '../../assets/Portal/trioIcones.svg'
import iconeMobile from '../../assets/Portal/iconeMobile.svg'
function Introducao (){
    return(
        <Container>

            <img src={iconeMobile} alt='Trio de Icones' className='iconeMobile' />
            <Textos>
                <h1>Doe sangue,</h1>
                <h1>salve vidas!</h1>
                <h2>Plataforma comunitária em pró de ajudar na conscientização de doação sanguínea! </h2>
                <div className='btn' >
                    <Button variant="contained" className='botao' >Saiba Mais!</Button>
                </div>
            </Textos>
            <img src={trio} alt='Trio de Icones' className='trio' />

        </Container>    
    )
}

export default Introducao
