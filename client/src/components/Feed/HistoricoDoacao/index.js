import React, { useState } from 'react'
import {Typography}from '@mui/material';
import { Container, List } from './styles';
import {IconButton,Tooltip }from '@mui/material';
import {useSelector} from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import api from '../../../services/api'
import Post from './PostDoacao'
import DonationListItem from '../../DonationListItem';


export default function Doacoes () {
    const [openModal, setOpenModal] = useState(false)
    const [minhas_doacoes, setMinhas_doacoes] = useState([])
    const id_user = useSelector(state => state.user.id_user);
    const donations = [
      {place: "Hemoal Trapiche", date: [2023, 3, 20]},
      {place: "Hemoal Serraria", date: [2022, 12, 18]},
      {place: "Hospital Universitário", date: [2022, 6, 25]},
      {place: "Hemoal Trapiche", date: [2022, 2, 3]},
      {place: "Hemoal Trapiche", date: [2021, 12, 7]}
      ]

      const formData = {idUser: id_user}
      React.useEffect(() => {
        const response = api.get(`/donation-register`, formData).then((response) => {
          //setMinhas_doacoes(response.data.data)
          console.log('idk')
          //console.log(minhas_doacoes);
        }).catch(err => {
          console.log('bomdia')
          console.log(err)
        })
      }, []);
      
    return (
      <Container>
        <div className='headers'>
          <h1>Meu histórico de doações</h1>
          <h4>Aqui você pode registrar suas doações já feitas.</h4>
        </div>
        <div>
        <Tooltip title="Postar uma solicitação">
            <IconButton aria-label="formulario" className='button' onClick={() => setOpenModal(true)}>
              <AddIcon sx={{color:'#fff'}} />
            </IconButton>
          </Tooltip>
        </div>
        <Post open={openModal} handleClose={() => setOpenModal(false)} />
        <List>
          {minhas_doacoes.map(donation => <DonationListItem date={donation.date} location={donation.place}/>)}
        </List>
      </Container>
    )
}


