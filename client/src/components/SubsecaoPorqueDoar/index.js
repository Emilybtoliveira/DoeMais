import React from 'react';
import {Textos} from './styles'

function SubsecaoPorqueDoar (props){
    return(
        <div>
            <Textos id='why'>
            <h1 >Por que doar?</h1>
                <br/>
            
            <h2 className='left'>Recurso insubstituível!</h2>
            <p>Você sabia que o sangue é um recurso essencial e insubstituível? Ele supre diversas demandas na área da saúde, abrangendo desde procedimentos médicos planejados como transplantes, transfusões e cirurgias agendadas, até situações emergenciais envolvendo ferimentos graves, como acidentes de trânsito, calamidades climáticas e episódios de violência.</p>
            <p>O sangue é essencial para tratamentos de todos os tipos de Câncer, bem como de algumas doenças crônicas graves como a Anemia Falciforme e a Talassemia. Nesses casos você não apenas estaria salvando a vida de um paciente, como também estaria provendo maior qualidade e tempo de vida para eles. Com apenas uma doação você estará atingindo todos esses contextos!</p>
            <img
            className='pictures'  
            src='https://medfocus.com.br/wp-content/uploads/2021/06/doacao-de-sangue-1.jpg' 
            alt='imagem doação de sangue sem conteudo textual'></img>
            
            <h2 className='left'>Uma doação salva até quatro vidas!</h2>
            <p>O seu sangue não é apenas um único recurso insubstituível, mas sim quatro! Após a doação, o sangue é submetido ao processo de centrifugação que o divide em quatro componentes, esses chamados hemocomponentes são: concentrado de hemácias, concentrado de plaquetas, plasma fresco congelado e crioprecipitado. Todos são essenciais e desempenham uma função no organismo humano, e cada um deles pode ser usado por um paciente diferente.</p>
            <p>Por conta disso, com uma única doação você estará impactando a vida de até quatro pessoas! Como falado previamente esse impacto pode se estender para diversas situações, de cirurgias eletivas a situações emergenciais, você estará fazendo a diferença nessas vidas!</p>
            <p>“Dizem que se você quer ver um milagre, basta apenas doar sangue.”</p>
            <p>Você pode ver quatro com apenas uma doação.</p>
            <img
            className='pictures' 
            src='https://radiomixfm.com.br/wp-content/uploads/2020/09/doe-sangue-mix.png' 
            alt='imagem conscientização doação de sangue sem conteudo textual'></img>
            
            <h2 className='left'>Ajude os hemocentros!</h2>
            <p>Os hemocentros são popularmente conhecidos como bancos de sangue. Se configuram como instituições públicas ou privadas que proveem sangue, de componentes a hemoderivados, para a rede pública e privada através de programas de hemoterapia e hematologia.</p>
            <p>A principal luta dos hemocentros é prover esses recursos essenciais e insubstituíveis para todos, entretanto eles estão sempre tendo que repor esse estoque, dado que o nível de doações é baixo.</p>
            <p>Estima-se que em território nacional, as doações recebidas anualmente nem chegam a corresponder <strong>2% da população brasileira doando com regularidade</strong>. Não bastasse o número baixo de doações, ainda tem que se considerar a raridade de alguns tipos sanguíneos, como o O negativo e sua demanda altíssima.</p>
            <p>Observe a tabela abaixo e veja que o O negativo pode doar para qualquer tipo, portanto em situações emergenciais onde não se sabe o tipo do doador, muitas vezes são as bolsas de O- que são utilizadas. Além disso o tipo sanguíneo O com rh positivo só pode receber o O -! Estima-se que no Brasil <strong>menos de 9% da população seja do tipo sanguíneo O -</strong>.</p>

            <img
            className='pictures'  
            src='https://www.oswaldocruz.com/site/images/artigos/tabela_doacaosangue.jpg' 
            alt='tabela de relação doador-receptor tipos sanguíneo'></img>
            
            <h2 className='left'>Outros benefícios</h2>
            
            <h3>Um dia de folga por ano!</h3>
            <p>Nas Leis do Trabalho está previsto que se você for funcionário de uma empresa e trabalhe com carteira assinada, então ela deve conceder um dia de folga, mediante a apresentação de um atestado comprovando sua doação de sangue.</p>
            <p>Embora se possa doar mais de uma vez ao ano, o benefício é limitado a uma vez a cada 265 dias. Ademais, se tratando de uma legislação federal, a regra vigora em todo território nacional.</p><br/>
        
            <h3>Meia-entrada em cinemas, teatros e eventos culturais!</h3>
            <p>Desde 2019 o doador que comprove um mínimo de três doações de sangue por ano tem direito a meia-entrada em cinemas, cineclubes, teatros, espetáculos musicais e circenses e eventos educativos, esportivos, de lazer e entretenimento.</p>
            <p>Embora tenha sido aprovada apenas em 2019 pela Comissão de Assuntos Sociais do Senado Federal, leis semelhantes já existiam em outros estados, como o Espírito Santo e o Paraná. Algumas dessas extendem-se até outros benefícios, portanto é importante consultar seu hemocentro para saber.</p><br/>
    
            <h3>Carteirinha de doador!</h3>
            <p>Já existe um projeto na legislação que buscando incentivar a doação de sangue, prevê a criação de uma Carteira Nacional de Doador de Sangue, para assim os registros de doação estarem unificados e o doador tenha uma forma rápida e assegurada de justificar sua doação.</p>
            <p>Embora ainda não aprovado, em alguns estados ou hemocentros já existem carteirinhas de doador próprias, as quais podem ser usadas como comprovantes. Entretanto, novamente incentivamos que se consulte o hemocentro acerca da disponibilização do comprovante.</p><br/>
        
            <h3>Check-up completo e grátis</h3>
            <p>Antes do seu sangue ser considerado apto para doar, o hemocentro realiza exames em outra amostra coletada especificamente para isso. Portanto, você já irá receber os resultados acerca de algumas doenças como hepatite B e C, Sífilis e HIV.</p><br/>
                
            </Textos>
        </div>    
    )
}

export default SubsecaoPorqueDoar