import React from 'react';
import {Container} from './styles'
import Cards from '../CardSolicitacao'
function Portal (){
    return(
        <Container>
            <div className='desc' >
                <div className='text' >
                    <h1>Solicitantes de doação </h1>
                    <h3>Nosso objetivo é ajudar na divulgação das pessoas que necessitam de doação sanguínea. Aqui você pode divulgar um pedido de doação ou ajudar quem precisa.</h3>
                </div>
                <h2>#AjudeQuemPrecisa</h2>
            </div>
            <div>
                <Cards/>
            </div>
        </Container>
    )
}

export default Portal
