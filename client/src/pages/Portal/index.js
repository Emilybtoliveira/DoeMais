import React from 'react';
import {Container} from './styles'
import Header from '../../components/Header'
import Introducao from '../../components/Introducao'
import Solicitacao from '../../components/SolicitacaoIntro'
import InfoSecao from '../../components/InfoSecao'
import Rodape from '../../components/Rodape'
import { useRef } from 'react';
import {useSelector} from 'react-redux'


function Portal (){

    const targetRef = useRef(null);
    const handleClick = () => {
      window.scrollTo({
        top: targetRef.current.offsetTop,
        behavior: 'smooth'
      });
    }

    return(
      <div>

        <Container>
            <Header/>
            <Introducao button={handleClick}/>
            <div ref={targetRef}>
                <Solicitacao/>
            </div>
            <InfoSecao/>
        </Container>    
        <Rodape/>
      </div>
        
    )
}

export default Portal
