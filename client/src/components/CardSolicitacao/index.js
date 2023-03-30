import React from 'react';
import { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Modal,Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import { CardPrincipal,ContentModal } from './styles';
import img1 from '../../assets/Portal/CardsEstatico/img1.svg';
import img2 from '../../assets/Portal/CardsEstatico/img2.svg';
import img3 from '../../assets/Portal/CardsEstatico/img3.svg';
import wallpaperDoeMais from  '../../assets/wallpaperDoeMais.svg'
import hospital from '../../assets/Portal/CardsEstatico/hospital.svg';
import local from '../../assets/Portal/CardsEstatico/local.svg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/logo.svg'
import api from '../../services/api'
const theme = createTheme({
 
  palette: {
    primary: {
      main: 'rgba(197, 23, 23, 0.81)',
      darker: '#053e85',
    },
    
  
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
  const {solicitacao} = props;
  const [excluirSolic, setExcluirSolic] = React.useState(false)
  console.log(solicitacao)

  const handleExcluir = async () => {
    const response = await api.put(`/solicitations/${solicitacao.solicitationPersonId}`).then(response => {
      // setExcluirSolic(true)
      console.log(response)
      window.location.reload()
    }).catch(error =>{
      console.log(error)
    })
  }
    return(
      <ThemeProvider theme={theme}>
        <CardPrincipal sx={{ borderRadius: 3 }}>
              <div style={{display: solicitacao.person?"flex":'none', width: '100%', justifyContent: 'flex-end'}}>
                <div style={{cursor: 'pointer'}} ><EditIcon fontSize="small" color='primary'/></div>
                <div style={{cursor: 'pointer'}} onClick={() => setExcluirSolic(true)} ><DeleteIcon fontSize="small" /></div>
              </div>
            <CardMedia sx={{ height: 300, width: 'auto' }} image={solicitacao.person.picture? solicitacao.person.picture: wallpaperDoeMais } />
            <CardContent sx={{ paddingBottom: 1 }}>
              <Typography gutterBottom variant="h5" component="div" className="title">
                {solicitacao.person.name}  {solicitacao.person.idade?solicitacao.person.idade: ''} 
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                {solicitacao.person.description?solicitacao.person.description: '#AjudeQuemPrecisa'}
              </Typography>
              <div className="informacoes">
                <div>
                  <div className="icones">
                    <img src={local} alt="local" />
                    <Typography variant="h6" color="text.secondary" className="info">
                {solicitacao.person.city?solicitacao.person.city :  'Não informado'} {solicitacao.person.estado? ','+solicitacao.person.estado:''}
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
          <ModalExcluir open={excluirSolic} handleClose={() => setExcluirSolic(false)} handleExcluir={handleExcluir}/>
      </ThemeProvider>
            
    )
      
}

export default Cards
