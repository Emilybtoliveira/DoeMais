import React from 'react';
import {Textos} from './styles'

function SubsecaoPossoDoar (props){
    return(
        <div>
            <Textos id='can'>
            <h1>Posso ser um doador?</h1>
                <br/><br/>
                <p>Existem alguns critérios que precisam ser atendidos para que o usuário possa doar sangue. Alguns deles são básicos e intrínsecos ao indivíduo como sua idade e peso, enquanto outros são comportamentos que precisam ser evitados em um intervalo de tempo específico anterior à doação.</p>
                <p>Todavia, alguns critérios podem desqualificar a pessoa para ser um doador, seja temporariamente &#40;em um intervalo de até 1 ano&#41; ou permanentemente. Afinal a doação busca promover a vida, e infelizmente algumas doenças ou condições oferecem riscos à saúde do receptor. </p>
                <p>Essa questão torna ainda mais essencial que os doadores aptos ao processo de doação se apresentem ao serviço! Então atente-se para os critérios a seguir!</p>
            
            <h2 className='center'>Critérios Básicos</h2>
            <p>Para ser doador de sangue o candidato deve ter entre 16 e 69 anos. Antes a doação era exclusiva para maiores de idade, porém visando incentivar a proatividade desde cedo, esse limite foi reduzido a 16 anos desde que o candidato se apresente acompanhado de um responsável, e que esse leve sua documentação.</p>
            <p>Além disso, apesar do limite superior de 69, pessoas acima de 60 anos só podem doar sangue se já tiverem doado em algum momento antes dos 60. Por fim, também é necessário que o doador tenha mais de 50 kg!</p>
            <p>Atente-se na próxima sessão “<strong>Como doar</strong>, onde iremos falar sobre comportamentos que devem ser evitados antes da doação e o que você precisa levar de documentação.</p>

            <h2 className='center'>Intervalo entre doações</h2>
            <p>A doação é um ato voluntário e solidário que visa promover a vida, e deve ser seguro para ambas as partes envolvidas. Dito isso, mesmo apto a doar, o doador precisa respeitar certo intervalo de tempo entre as doações, tal intervalo varia de acordo com o sexo.</p>
            <p>As mulheres tem um intervalo mínimo de 90 dias entre cada doação, podendo doar no máximo três vezes ao ano. Os homens, por sua vez, podem doar sangue em um intervalo mínimo de 60 dias entre doações e fazer quatro doações por ano. Esse intervalo varia de acordo com sexo devido ao tempo que o organismo feminino e masculino levam para repor suas reservas de ferro.</p>
            <p>Você já fez alguma doação esse ano? Vem <strong>registrar sua última doação</strong> em nossa plataforma, assim você será notificado quando puder doar novamente!
</p>

            <h2 className='center'>Critérios Excludentes</h2>
            <p>Como falado previamente, alguns critérios podem tornar o candidato inapto a doar. Em caso temporário basta apenas esperar o intervalo de tempo necessário para realizar a doação. </p>
            <p>Entretanto os critérios permanentes são definitivos e desqualifica o doador, porém isso não te impede de contribuir para a causa! Você ainda pode atuar como um divulgador e incentivador da doação de sangue, compartilhando nosso portal com amigos e até mesmo tendo um cadastro na nossa plataforma para compartilhar as solicitações! Lembre-se que embora não possa doar, você tem o poder de fazer as dores de um solicitante serem ouvidas por algum doador!</p>
            <p>Abaixo você encontrará uma lista dos critérios excludentes mais gerais da doação de sangue. Caso deseje contemplar todos os critérios <strong>faça nosso questionário de auto-avaliação</strong> ele foi pensado para ser mais abrangente nos critérios e com base no questionário de triagem clínica que falaremos mais adiante na seção “Como doar?”. </p>
            <br/><h3>Temporários</h3>
            <p>Como o nome sugere, os impedimentos temporários apenas desqualificam o candidato dentro de um espaço limitado de tempo. Abaixo listaremos alguns desses critérios seguidos do período que se deve esperar antes de tentar realizar uma doação:</p>
            <ul>
                <li>Piercing ou Tatuagem: 1 ano;</li>
                <li>Vacinas: 2 a 30 dias a depender da vacina;</li>
                <li>Transfusão sanguínea: 1 ano;</li>
                <li>Ingestão de bebida alcoólica: 12 horas;</li>
                <li>Exposição a situação de risco de DSTs: 1 ano;</li>
                <li>Covid: 10 dias;</li>
                <li>Gripe/Resfriado/Febre: 7 dias;</li>
                <li>Gestantes: 90 dias em caso de parto normal / 180 em caso de cesária / 1 ano caso esteja em processo de lactação;</li>
            </ul>

            <br/><h3>Permanentes</h3>
            <p>Os critérios excludentes permanentes por sua vez, desqualificam totalmente o candidato a ser doador, por questões de segurança tanto para o indivíduo doador, quanto ao receptor. Segue abaixo os critérios permanentes: </p>
            <ul>
                <li>Uso de Drogas Injetáveis e ilícitas;</li>
                <li>Ter se submetido a um transplante de órgãos ou medula;</li>
                <li>Ser portador de doenças autoimunes transmissíveis por sangue &#40;AIDS, HTLV I e II, doença de chagas e Hepatites B e C&#41;</li>
                <li>Algumas outras doenças como: Parkison, qualquer tipo de câncer, Malária, Elefantíase, Hanseníase e outras;</li>
            </ul>

            </Textos>
        </div>    
    )
}

export default SubsecaoPossoDoar