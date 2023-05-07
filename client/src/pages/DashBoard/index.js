import React, {useEffect, useState} from 'react'
import Feed from '../../components/Feed'
import {useSelector, useDispatch} from 'react-redux'
import api from '../../services/api'
import {profile, Location} from '../../store/actions/userActions'

function Cadastro (){
    const dispatch = useDispatch()
    const id_user = useSelector(state => state.user.id_user);

    navigator.geolocation.getCurrentPosition(
        (position) => {
          if(position.coords.latitude && position.coords.longitude){
            const location = {latitude: position.coords.latitude, longitude: position.coords.longitude}
            dispatch(Location(location))
          }
        },
        (error) => {
          console.log(error);
          alert("Você precisa ativar a localização para podermos mostrar os solicitantes próximos a você.")
        }
    )

    useEffect(() => {
        api.get(`/user/${id_user}`).then((response) =>{
                dispatch(profile(response.data.data))
                console.log(response.data.data)
            }).catch((error) => {
            console.log(error)
                
            })
    }, [id_user])

    return (
      <div style={{overflowX: 'hidden'}}>
        <Feed/>
      </div>
    )
}

export default Cadastro