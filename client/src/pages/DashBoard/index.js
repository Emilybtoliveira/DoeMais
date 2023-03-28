import React from 'react'
import {Container} from './styles'
import Header from '../../components/Header'
import FormCadastro from '../../components/FormCadastro'
import Feed from '../../components/Feed'
import {useSelector} from 'react-redux'
import api from '../../services/api'

function Cadastro (){
    
    const user_email = useSelector(state => state.user.email);
    const profile_user = []
    React.useEffect( () => {
            api.get('/user').then(response => {
                const users = response
                for (const us in users.data.data) {
                    console.log(us.email)
                    if (us.email === user_email) {
                        console.log(us.name)
                    }
                }
            }).catch(error =>{
                console.log(error)
            })
    }, [])
     


    return(
        <div style={{overflowX: 'hidden'}}>
        <Feed/>
        </div>
        
    )
}

export default Cadastro