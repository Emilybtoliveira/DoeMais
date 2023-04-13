import React from 'react';
import {Textos} from './styles'
import MembroEquipe from '../MembroEquipe';
import { links } from './sourcelinks';

function SubsecaoFontes (props){
    
    return(
        <div>
            <Textos  id='source'>
            <h1>Fontes</h1>
            <ul>
                <li>
                    SOUZA, M. K. B. DE .; SANTORO, P.. Desafios e estratégias para doação de sangue e autossuficiência sob perspectivas regionais da Espanha e do Brasil. Cadernos Saúde Coletiva, v. 27, n. Cad. saúde colet., 2019 27&#40;2&#41;, p. 195-201, abr. 2019.
                </li>
                <li>
                BARBOZA, S. I. S.; COSTA, F. J. DA .. Marketing social para doação de sangue: análise da predisposição de novos doadores. Cadernos de Saúde Pública, v. 30, n. Cad. Saúde Pública, 2014 30&#40;7&#41;, p. 1463-1474, jul. 2014. 
                </li>
                <li>
                RODRIGUES, R. S. M.; REIBNITZ, K. S.. Estratégias de captação de doadores de sangue: uma revisão integrativa da literatura. Texto & Contexto - Enfermagem, v. 20, n. Texto contexto - enferm., 2011 20&#40;2&#41;, p. 384-391, abr. 2011. 
                </li>
                <li>
                BRENER, S. et al.. Fatores associados à aptidão clínica para a doação de sangue: determinantes demográficos e socioeconômicos. Revista Brasileira de Hematologia e Hemoterapia, v. 30, n. Rev. Bras. Hematol. Hemoter., 2008 30&#40;2&#41;, p. 108-113, mar. 2008.
                </li>
                <li>
                CANÇADO, R. D. et al.. Avaliação laboratorial da deficiência de ferro em doadoras de sangue. Revista Brasileira de Hematologia e Hemoterapia, v. 29, n. Rev. Bras. Hematol. Hemoter., 2007 29&#40;2&#41;, p. 153-159, abr. 2007.
                </li>
                <li>
                Mohammed, S., Essel, H.B. Motivational factors for blood donation, potential barriers, and knowledge about blood donation in first-time and repeat blood donors. BMC Hematol 18, 36 &#40;2018&#41;. https://doi.org/10.1186/s12878-018-0130-3
                </li>
                {links.map(link => <li key = {'key'}><a href={link} target='blank'>{link}</a></li>)}
    
            </ul>

                

            </Textos>
        </div>    
    )
}

export default SubsecaoFontes