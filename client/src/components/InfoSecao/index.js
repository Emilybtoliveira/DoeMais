import React from 'react';
import {Container, ContainerA} from './styles'
import SubsecaoQuemSomos from '../SubsecaoQuemSomos';
import SubsecaoPorqueDoar from '../SubsecaoPorqueDoar';
import SubsecaoPossoDoar from '../SubsecaoPossoDoar';
import SubsecaoComoDoar from '../SubsecaoComoDoar';
import SubsecaoMitos from '../SubsecaoMitos';
import SubsecaoFontes from '../SubsecaoFontes';

function InfoSecao (props){
    return(
        <Container>
            <div className='buttonSection'>
                <button><a href='#why'>Por que doar?</a></button>
                <button><a href='#can'>Posso doar?</a></button>
                <button><a href='#how'>Como é o processo de doação?</a></button>
                <button><a href='#mitos'>Mitos sobre a doação</a></button>
                <button><a href='#source'>Fontes</a></button>
            </div>
            <ContainerA>
            <SubsecaoQuemSomos/>
            <br/><br/>
            <SubsecaoPorqueDoar/>
            <br/><br/>
            <SubsecaoPossoDoar/>
            <br/><br/>
            <SubsecaoComoDoar/>
            <br/><br/>
            <SubsecaoMitos/>
            <br/><br/>
            <SubsecaoFontes/>
            </ContainerA>
        </Container>
            
        
    )
}

export default InfoSecao