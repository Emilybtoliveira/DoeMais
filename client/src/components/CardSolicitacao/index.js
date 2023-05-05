import React, { useCallback, useRef } from 'react';
import { toJpeg } from 'html-to-image';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Modal,Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import { CardPrincipal,ContentModal } from './styles';
import wallpaperDoeMais from  '../../assets/wallpaperDoeMais.svg'
import hospital from '../../assets/Portal/CardsEstatico/hospital.svg';
import local from '../../assets/Portal/CardsEstatico/local.svg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/logo.svg'
import Tooltip from '@mui/material/Tooltip';
import {useDispatch} from 'react-redux'
import { share } from '../../store/actions/userActions';

import api from '../../services/api'
import PostEditSolicitacao from './PostEditSolicitacao'
import styled from 'styled-components'

const theme = createTheme({
 
  palette: {
    primary: {
      main: 'rgba(197, 23, 23, 0.81)',
      darker: '#053e85',
    },
    
  
  },
});

const IconButton = styled('div')({
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.6,
  },
});


const ModalExcluir = (props) =>{
  return(
      <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <ContentModal>
              <img src={logo} alt="logo" style={{marginBottom: '2%'}} />
              <div style={{display: "flex", justifyContent: 'center', alignItems:'center', flexDirection:'column'}} >                   
                  <h2 style={{marginBottom: '2%'}} >Tem certeza que deseja excluir essa solicitação?  </h2>
                  <div style={{display: "flex"}}>
                    <Button onClick={props.handleExcluir}  variant="contained" sx={{mr: '10%' }}  >Sim</Button>
                    <Button onClick={props.handleClose}  variant="outlined"  >Cancelar</Button>
                  </div>
              </div>
          </ContentModal>
      </Modal>
  )
}


function Cards(props) {
  const navigate = useNavigate()
  
  
  const {solicitacao} = props;
  const dispatch = useDispatch()
  
  const [excluirSolic, setExcluirSolic] = React.useState(false)
  const [editarSolic, setEditarSolic] = React.useState(false)
  const handleExcluir = async () => {
    const response = await api.put(`/solicitations/${solicitacao.solicitationPersonId}`).then(response => {
      window.location.reload()
    }).catch(error =>{
      console.log(error)
    })
  }


  const handleShare = (id) =>{
    dispatch(share(id))
    navigate(`/compartilhar-solicitacao/${id}`)
  }

  
  let srcImage = "http://localhost:5000/files/solicitations/";
  if (solicitacao.person && solicitacao.person.picture)
  {
    srcImage += solicitacao.person.picture
  }
  else if (solicitacao.picture)
  {
    srcImage += solicitacao.picture
  }
  else
  {
    srcImage = wallpaperDoeMais
  }


    return(
      <div >
        <ThemeProvider theme={theme}>
          {solicitacao.person?
               <CardPrincipal sx={{ borderRadius: 3 }}>
                <div style={{display: solicitacao.person?"flex":'none', width: '100%', justifyContent: 'flex-end'}}>
                  <IconButton 
                  onClick={() => setEditarSolic(true) } ><EditIcon fontSize="small" color='primary'/></IconButton>
                  <IconButton onClick={() => setExcluirSolic(true)} ><DeleteIcon fontSize="small" /></IconButton>
                </div>
              <div sx={{minHeight: '50%'}} >
                <CardMedia sx={{ minHeight:150 ,maxHeight: 150, width: 'auto' }} image={ srcImage } />
              </div>
              
              <CardContent sx={{pt:1, pb: 0}}>
                <Typography gutterBottom variant="h5" component="div" className="title">
                  {solicitacao.person.name} - {solicitacao.person.age?solicitacao.person.age + ' anos': ''} 
                </Typography>
              </CardContent>
              <CardContent sx={{ paddingBottom: 1, minHeight: 95, p: 0, mt:1}}>
                <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                  {solicitacao.person.description?solicitacao.person.description: '#DoeSangueSalveVidas'}
                </Typography>
          </CardContent>
          <CardContent sx={{ p: 0}}>

                <div className="informacoes">
                  <div>
                    <div className="icones">
                      <img src={local} alt="local" />
                      <Typography variant="h6" color="text.secondary" className="info">
                        {solicitacao.person.city?solicitacao.person.city:  'Não informado'}{solicitacao.person.state? ', '+solicitacao.person.state:''}
                      </Typography>
                    </div>
                    <div className='icones' >
                      <img src={hospital} alt='hospital'/>
                      <Typography variant="h6" color="text.secondary" className='info'>
                      {solicitacao.person.hospital?solicitacao.person.hospital:'Não informado'}
                    </Typography>
                    </div>
                  </div>
                  <Typography variant="h4" className='tipo'>{solicitacao.person.bloodtype}</Typography>
                </div>
                  <Typography variant="body2" className='publicado'>Publicado em {solicitacao.creation_date}</Typography>
              </CardContent>
          </CardPrincipal>
          
          :
          
          <CardPrincipal id={'card '+solicitacao.id} sx={{ borderRadius: 3, height: '100%'}} >
            <div style={{display: "flex", width: '100%', justifyContent:'flex-end'}}>                       
              {/* <div style={{cursor: 'pointer'}}><a href={`https://web.whatsapp.com/send?text=${solicitacao.description?solicitacao.description:"#doesangue"}`} target="_blank"><WhatsAppIcon fontSize="small" color="success"/></a></div> */}
              <Tooltip title='Compartilhar solicitação' placement='top' >
                <div style={{cursor: 'pointer'}} id="download_button" onClick={() => handleShare(solicitacao.id)}><ShareIcon fontSize="small" color="disabled"/></div>
              </Tooltip>
            </div>
            <div sx={{minHeight: '50%'}} >
              <CardMedia sx={{ minHeight:150 ,maxHeight: 150, width: 'auto' }} image={ srcImage } />
            </div>
        <CardContent sx={{pt:1, pb: 0}}>
          <Typography variant="h5" component="div" className="title">
            {solicitacao.name} - {solicitacao.age} anos
          </Typography>
        </CardContent>

        <CardContent sx={{ paddingBottom: 1, minHeight: 95, p: 0, mt:1}}>
          <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
            {solicitacao.description?solicitacao.description: '#DoeSangueSalveVidas'}
          </Typography>
        </CardContent>
        <CardContent sx={{ p: 0}}>

            <div className="informacoes">
              <div>
                <div className="icones">
                  <img src={local} alt="local" />
                  <Typography variant="h6" color="text.secondary" className="info">
                    {solicitacao.city?solicitacao.city :  'Não informado'}, {solicitacao.state}
                  </Typography>
                </div>
                <div className='icones' >
                  <img src={hospital} alt='hospital'/>
                  <Typography variant="h6" color="text.secondary" className='info'>
                  {solicitacao.hospital?solicitacao.hospital:'Não informado'}
                </Typography>
                </div>
              </div>
              <Typography variant="h4" className='tipo'>{solicitacao.bloodtype}</Typography>
            </div>
              <Typography variant="body2" className='publicado'>Publicado em {solicitacao.Solicitation.creation_date}</Typography>
        </CardContent>

      </CardPrincipal>
          }           
          <ModalExcluir open={excluirSolic} handleClose={() => setExcluirSolic(false)} handleExcluir={handleExcluir}/>

          <PostEditSolicitacao open={editarSolic} handleClose={() => setEditarSolic(false)} id_solic={solicitacao.id} />

      </ThemeProvider>
      </div>
    )
      
}

export default Cards