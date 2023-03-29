import React from 'react';
import {Textos} from './styles'
import MembroEquipe from '../MembroEquipe';

function SubsecaoQuemSomos (props){
    return(
        <div>
            <Textos>
            <h1>Quem somos?</h1>
                <br/><br/>
                <p>Nossa equipe é composta por graduandos do curso de Ciência da Computação da UFAL. Juntos temos o intuito de quebrar as barreira da desinformação e desmistificar certas questões acerca da doação de sangue.</p>
                <p>A informação é um fator determinante para esse ato solidário dado que pelo menos <strong>metade da população brasileira não doa sangue por um déficit informativo, noções equivocadas e medo.</strong> </p>
                <p>Apesar de diversos sites trazerem dados acerca desse processo, notamos que muitos estão abordando questões específicas da doação. Portanto, visando incentivar ainda mais a proatividade, ajudar hemocentros e ter um impacto positivo nessa questão essencial da saúde pública, adotamos a missão de desfragmentar a informação, compilando-a nesse portal de modo acessível para qualquer pessoa.</p>
                <p>Além disso, buscamos romper a barreira comunicativa entre doadores e solicitantes, promovendo um estreitamento dessa relação e atuando como uma rede comunicativa da doação de sangue. </p>
                <p>Se você doa sangue com regularidade, está precisando de uma doação para si mesmo ou algum conhecido, ou ainda sempre teve interesse em doar, mas não sabia por onde começar: Essa plataforma é para você. Aqui você encontrará a resposta para perguntas frequentes como: onde doar, como doar, quem está precisando de doação e ainda se você pode doar.</p>
                <div className='team'>
                <MembroEquipe nome={"Emily"} cargo={"A+"} imagem={"https://github.com/Emilybtoliveira.png"} link={"https://github.com/Emilybtoliveira"}/>
                <MembroEquipe nome={"Jonathan"} cargo={"A+"} imagem={"https://github.com/JonathanYuri.png"} link={"https://github.com/JonathanYuri"}/>
                <MembroEquipe nome={"Thalia"} cargo={"A+"} imagem={"https://github.com/thaliabma.png"} link={"https://github.com/thaliabma"}/>
                <MembroEquipe nome={"Rafa"} cargo={"A+"} imagem={"https://github.com/rafaemilima.png"} link={"https://github.com/rafaemilima"}/>
                </div>

            </Textos>
        </div>    
    )
}

export default SubsecaoQuemSomos