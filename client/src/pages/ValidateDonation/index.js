import {Container} from './styles'
import Header from '../../components/Header'
import FormValidateDonation from '../../components/FormValidateDonation'

function Cadastro (){
    return (
        <div style={{overflowX: 'hidden'}}>
            <Header/>
            <Container>
                <FormValidateDonation/>
            </Container>
        </div>
    )
}

export default Cadastro