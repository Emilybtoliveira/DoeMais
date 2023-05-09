import React, {useState} from 'react';
import {Container, ContainerA} from './styles'
import SubsecaoQuemSomos from '../SubsecaoQuemSomos';
import SubsecaoPorqueDoar from '../SubsecaoPorqueDoar';
import SubsecaoPossoDoar from '../SubsecaoPossoDoar';
import SubsecaoComoDoar from '../SubsecaoComoDoar';
import SubsecaoMitos from '../SubsecaoMitos';

import {Button, Grid} from '@mui/material';
import SubsecaoFontes from '../SubsecaoFontes';


function InfoSecao (props){
    const [sectionIndex, setSection] = useState(0);
    const botoes = ['Quem somos', 'Porque doar?', 'Posso doar?', 'Como doar?', 'Mitos', 'Fontes']
    
    return(
        <Container>
            
            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center" }}>
                {botoes.map((item,i) =>(
             sectionIndex != i?
              <Grid item xs={4} sm={4} md={2}>
                  <Button key = {i} onClick={() => {setSection(i);}}>
                    {item}
                  </Button>
              </Grid>
              :
              <Grid item xs={4} sm={4} md={2}>
                  <Button key = {i} disabled={false} style={{backgroundColor:'white', color: 'rgba(204, 0, 0, 1)', border:'1px solid rgba(204, 0, 0, 1)'}}>
                    {item}
                  </Button>
              </Grid>
                         
            ))}
            </Grid> 
                

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