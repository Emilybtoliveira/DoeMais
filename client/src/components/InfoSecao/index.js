import React, {useState} from 'react';
import {Container, ContainerA} from './styles'
import SubsecaoQuemSomos from '../SubsecaoQuemSomos';
import SubsecaoPorqueDoar from '../SubsecaoPorqueDoar';
import SubsecaoPossoDoar from '../SubsecaoPossoDoar';
import SubsecaoComoDoar from '../SubsecaoComoDoar';
import SubsecaoMitos from '../SubsecaoMitos';

import {Button} from '@mui/material';
import SubsecaoFontes from '../SubsecaoFontes';


function InfoSecao (props){
    const [sectionIndex, setSection] = useState(0);
    return(
        <Container>
            <div className='buttonSection'>
                <Button onClick={() => {setSection(0);}}>Quem somos?</Button>
                <Button onClick={() => {setSection(1);}}>Por que doar?</Button>
                <Button onClick={() => {setSection(2);}}>Posso doar?</Button>
                <Button onClick={() => {setSection(3);}}>Como doar?</Button>
                <Button onClick={() => {setSection(4);}}>Mitos</Button>
                <Button onClick={() => {setSection(5);}}>Fontes</Button>
            </div>
            <ContainerA>
            {sectionIndex==0?<SubsecaoQuemSomos/>
            :sectionIndex==1?<SubsecaoPorqueDoar/>
            :sectionIndex==2?<SubsecaoPossoDoar/>
            :sectionIndex==3?<SubsecaoComoDoar/>
            :sectionIndex==4?<SubsecaoMitos/>
            :<SubsecaoFontes/>
          } 
            <br/><br/>
            </ContainerA>
        </Container>
            
        
    )
}

export default InfoSecao