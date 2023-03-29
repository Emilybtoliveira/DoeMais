import React, { useState } from 'react'
import {IconButton,Tooltip }from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Container } from './styles';
import Post from './PostSolicitacao'


export default function Solicitacoes () {
  const [openModal, setOpenModal] = useState(false)


  return (
      <Container>
        <div className='add'>
          <div>
            <h1>Minhas Solicitações</h1>
            <h4>Aqui você pode postar uma solicitação de doação sanguínea!</h4>
          </div>
          <Tooltip title="Postar uma solicitação">
            <IconButton aria-label="formulario" className='button' onClick={() => setOpenModal(true)} >
              <AddIcon sx={{color:'#fff'}} />
            </IconButton>
          </Tooltip>
        </div>

        <Post open={openModal} handleClose={() => setOpenModal(false)} />
      </Container>
    )
}


