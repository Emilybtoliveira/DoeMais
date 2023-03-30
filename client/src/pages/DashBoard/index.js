import React, {useEffect}from 'react'
import {Container} from './styles'
import Header from '../../components/Header'
import FormCadastro from '../../components/FormCadastro'
import Feed from '../../components/Feed'
import {useSelector, useDispatch} from 'react-redux'
import api from '../../services/api'
import {profile} from '../../store/actions/userActions'
function Cadastro (){
    const dispatch = useDispatch()
    const id_user = useSelector(state => state.user.id_user);
    
    useEffect( () => {
            api.get(`/user/${id_user}`).then(response => {
                dispatch(profile(response.data.data))
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