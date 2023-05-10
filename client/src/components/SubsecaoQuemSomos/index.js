import React from 'react';
import {Textos} from './styles'
import { Grid } from '@mui/material';
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
                <p>Se você doa sangue com regularidade, está precisando de uma doação para si mesmo ou alguém do seu círculo social, ou ainda sempre teve interesse em doar, mas não sabia por onde começar: Essa plataforma é para você. Aqui você encontrará a resposta para perguntas frequentes como: onde doar, como doar, quem está precisando de doação e ainda se você pode doar.</p>
                <p>Aos doadores tanto iniciantes quanto mais experientes, temos dentro de nosso sistema funcionalidades que podem te ajudar, como a nossa página de registro de doações, onde você pode registrar cada doação feita e assim manter um acompanhamento de quando estará apto a doar novamente.</p>
                <p>Por fim, às insituições de saúde oferecemos um serviço de cadastro de campanhas de doação, com premiação ou solidárias, visando fomentar ainda mais essa ação tão essencial, ao passo que promovemos sua instituição!    </p>
                <div className='team'>
                <Grid container style={{padding:'3%'}}>
                    <Grid item xs={6} md={3}>
                        <MembroEquipe nome={"Emily"} cargo={"A+"} imagem={"https://github.com/Emilybtoliveira.png"} link={"https://github.com/Emilybtoliveira"}/>
                    </Grid>
                    <Grid item  xs={6} md={3}>
                        <MembroEquipe nome={"Jonathan"} cargo={"A+"} imagem={"https://github.com/JonathanYuri.png"} link={"https://github.com/JonathanYuri"}/>
                    </Grid>
                    <Grid item  xs={6} md={3}>
                        <MembroEquipe nome={"Thalia"} cargo={"A+"} imagem={"https://github.com/thaliabma.png"} link={"https://github.com/thaliabma"}/>
                    </Grid>
                    <Grid item  xs={6} md={3}>
                        <MembroEquipe nome={"Rafael"} cargo={"A+"} imagem={"https://github.com/rafaemilima.png"} link={"https://github.com/rafaemilima"}/>
                    </Grid>
                </Grid>
                </div>

            </Textos>
        </div>    
    )
}

export default SubsecaoQuemSomos