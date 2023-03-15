import React from 'react';
import {Container} from './styles'
import Header from '../../components/Header'
import Introducao from '../../components/Introducao'
import Solicitacao from '../../components/SolicitacaoIntro'
import Rodape from '../../components/Rodape'
import { useRef } from 'react';


function Portal (){

    const targetRef = useRef(null);

    const handleClick = () => {
      window.scrollTo({
        top: targetRef.current.offsetTop,
        behavior: 'smooth'
      });
    }

    return(
        <Container>
            <Header/>
            <Introducao button={handleClick}/>
            <div ref={targetRef}>
                <Solicitacao />
            </div>
            <Rodape/>
        </Container>    
    )
}

export default Portal
