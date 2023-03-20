import React from 'react';
import {Textos} from './styles'

function SubsecaoComoDoar (props){
    return(
        <div>
            <Textos id='how'>
            <h1>Como doar?</h1>
                <br/><br/>
                <p>Agora que você já sabe que pode contribuir para uma causa tão essencial, é hora de explicarmos como se dá o processo de doação de sangue propriamente dito.</p>
                <p>Nosso propósito é abordar todo o processo para demonstrar o quão seguro e prático ele é. Nesta seção iremos tratar os cuidados que precisam ser tomados pré-doação, as 4 etapas da doação de sangue e algumas recomendações pós-doação.</p>

                <h2 className='center'>Antes de doar!</h2>
                <p><strong>O repouso e sua alimentação são importantes nesse momento!</strong></p>
                <p>Você deve ter dormido pelo menos seis horas dentro das últimas 24 horas para poder doar. Ademais, é necessário que você se alimente, você não pode doar sangue em jejum, entretanto a refeição pré doação deve ser leve e sem alimentos gordurosos, como leite e derivados.</p>
                <p>Por fim, não esqueça de levar a documentação necessária! Para a doação você precisa apenas de um documento original de identidade com foto, filiação e assinatura Abaixo está uma lista dos documentos aceitos:</p>
                <ul>
                    <li>Carteira de Identidade;</li>
                    <li>CNH;</li>
                    <li>Carteira de Trabalho;</li>
                    <li>Passaporte;</li>
                    <li>Carteira de Reservista.</li>
                </ul>

                <h2 className='center'>Onde posso doar?</h2>
                <p>A doação pode ser feita em qualquer posto de coleta próximo a você! Basta apenas que você siga as recomendações acima e se apresente no local. Acesse nossa plataforma para descobrir os hemocentros da sua região!</p>

                <h2 className='center'>Doando seu sangue!</h2>
                <h3>1. Registro</h3>
                <p>Após se apresentar no balcão como candidato a doação, será feito um cadastro com base em informações gerais e pessoais obtidas através de perguntas e do documento de identificação.</p>
                <h3>2. Triagem Hematológica</h3>
                <p>Nessa etapa serão realizados alguns exames rápidos para se ter noção de sua condição física. Serão verificadas sua pressão arterial e temperatura, e a partir de uma única gota de sangue também verificarão seu teor de hemoglobina ou hematócrito, garantindo que você não apresenta um quadro de princípio de anemia.</p>
                <h3>3. Triagem Clínica</h3>
                <p>Você deverá responder um questionário de triagem para saber se você está apto a doar. As perguntas envolvem seu histórico de saúde, bem como viagens recentes e outros fatores de risco. <strong>Acesse nosso questionário de autoavaliação para saber se você está apto a doar.</strong></p>
                <p>Ao fim da entrevista você será informado se está apto a doar, e caso não esteja, qual será a janela de tempo de sua inaptidão: dias, semanas, meses, um ano ou definitiva.</p>
                <p>Por fim, caso seja considerado apto a doar, você assinará um Termo de Consentimento e Responsabilidade, declarando a veracidade das respostas do questionário e consentindo a coleta de sangue.</p>
                <h3>4. Coleta</h3>
                <p>O doador é encaminhado até a sala de coleta e a assepsia do braço é realizada antes da punção. Todo o material utilizado nesse processo é esterelizado e de uso único, ademais o processo é assistido o tempo todo por profissionais. </p>
                <h3>5. Voto de autoexclusão</h3>
                <p>Essa etapa é fundamental e consiste em uma chance íntima do doador indicar que seu sangue não deve ser usado após a doação. Tal precaução existe tendo em vista o constrangimento que alguns podem sentir ao responder algumas perguntas de cunho mais íntimo e portanto, buscando evitar constrangimento, não são 100% honestos em suas respostas. Assim mesmo aprovado, você ainda pode indicar nessa etapa que não se qualifica.</p>
                <p>O questionário busca validar a veracidade de suas respostas na triagem clínica, constitui apenas de uma pergunta, e pode ser fornecido tanto após a coleta, quanto ao fim do processo de triagem clínica.</p>
                <p>Caso seja fornecido após a triagem, mesmo que você marque que não considera seu sangue seguro para doar, você ainda será encaminhado para a coleta para evitar qualquer constrangimento.</p>

                <h2 className='center'>Após doar!</h2>
                <p>Após a doação você poderá prosseguir normalmente com seu dia, entretanto é recomendável que se tenha alguns cuidados, dentre eles:</p>
                <ul>
                    <li>Alimentação: Após a coleta faça o lanche no posto de coleta e ao longo do dia mantenha uma refeição balanceada.</li>
                    <li>Repouso: Evite esforços físicos desnecessários dentro das próximas 24 horas;</li>
                    <li>Hidratação: Nas seis horas que sucedem a doação beba bastante água.</li>
                    <li>Evite: Fumar e ingerir bebidas alcoólicas nas próximas 12 horas.</li>
                </ul>

            </Textos>
        </div>    
    )
}

export default SubsecaoComoDoar