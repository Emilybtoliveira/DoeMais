import React, { useState } from 'react'
import {Typography}from '@mui/material';
import { Container, List } from './styles';
import {IconButton,Tooltip }from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Post from './PostDoacao'
import DonationListItem from '../../DonationListItem';

export default function Solicitacoes () {
    const [openModal, setOpenModal] = useState(false)
    const donations = [
      {location: "Hemoal Trapiche", date: [2023, 3, 20]},
      {location: "Hemoal Serraria", date: [2022, 12, 18]},
      {location: "Hospital Universitário", date: [2022, 6, 25]},
      {location: "Hemoal Trapiche", date: [2022, 2, 3]},
      {location: "Hemoal Trapiche", date: [2021, 12, 7]}
      ]
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
          {donations.map(donation => <DonationListItem date={donation.date} location={donation.location}/>)}
        </List>
      </Container>
    )
}


