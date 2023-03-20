import React from 'react';
import {Textos} from './styles'

function SubsecaoMitos (props){
    return(
        <div>
            <Textos id='mitos'>
            <h1>Mitos sobre a doação de sangue</h1>
                <br/><br/>
                <ul>
                    <li>
                        <h4>Pessoas com tatuagens e piercings não podem doar sangue? <strong>FALSO!</strong></h4>
                        <br/>
                        <p>Apenas pessoas com piercing na boca ou áreas íntimas não podem doar, devido a sensibilidade dessas regiões a infecções. Mesmo assim essas pessoas podem doar 12 meses após retirarem os piercings, o mesmo prazo que se pode doar após fazer uma tatuagem ou colocar o piercing em alguma área diferente das citadas acima.</p>
                    </li>
                    <li>
                        <h4>Doar sangue afina ou engrossa o sangue? <strong>FALSO!</strong></h4>
                        <br/>
                        <p>Doar sangue não afeta sua consistência. o volume sanguíneo é reposto após 24 horas.</p>
                    </li>
                    <li>
                        <h4>Doar sangue oferece um risco à saúde do doador? <strong>FALSO!</strong></h4>
                        <br/>
                        <p>Dado que antes da doação existe todo um processo de triagem para garantir que o candidato esteja em condições saudáveis.</p>
                        <p>Não há nenhum risco de contaminação durante o processo, dado que todos os equipamentos usados são de uso único, esterilizados e apirogênicos &#40;não causam febre &#41;. Além disso o procedimento é assistido por um profissional e a quantidade de sangue doada, mesmo em uma doação completa &#40;450ml&#41; não oferece nenhum risco a vida do doador, pois corresponde a menos de 10% do volume sanguíneo total de um adulto.</p>
                    </li>
                    <li>
                        <h4>Doar sangue emagrece ou engorda? <strong>FALSO!</strong></h4>
                        <br/>
                        <p>Dado que o volume de líquido no corpo é reposto em apenas 24 horas, portanto não há perda ou ganho de peso.</p>
                    </li>
                    <li>
                        <h4>Mulheres não podem doar sangue menstruadas? <strong>FALSO!</strong></h4>
                        <br/>
                        <p>O organismo feminino já está habituado com a perda de sangue durante o processo menstrual, e portanto já está acostumado a repor a quantidade necessária. A quantidade de sangue doada é inferior a 10% do volume sanguíneo total e a ausência dessas células sanguíneas não oferece nenhum risco ao metabolismo, sendo repostas em uma janela de tempo muito curta.</p>
                    </li>
                    <li>
                        <h4>A vacinação é um critério excludente definitivo? <strong>FALSO!</strong></h4>
                        <br/>
                        <p>A vacinação não desqualifica permanentemente um candidato à doação. Entretanto é um critério excludente temporário, sendo assim, a depender da vacina ele terá que aguardar uma determinada janela de tempo antes de doar.</p>
                    </li>
                    <li>
                        <h4>Doar sangue é viciante? </h4>
                        <br/>
                        <p>O processo de doação de sangue não apresenta nenhum estímulo a um comportamento vicioso. Tanto que as doações tem que respeitar uma janela de tempo que é definida a partir do sexo do candidato.</p>
                    </li>
                </ul>

            </Textos>
        </div>    
    )
}

export default SubsecaoMitos