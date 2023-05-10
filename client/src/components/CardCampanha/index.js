import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardPrincipal, ContentModal } from './styles';
import campaignPhoto from '../../assets/Feed/campaignPhoto.png'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../../services/api'
import {IconButton, Button, Modal} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CloseIcon from '@mui/icons-material/Close';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import logo from '../../assets/logo.svg'

import {
  Snackbar,
  Alert 
} from '@mui/material';

import ShowDonators from './ShowDonators'

import {useSelector} from 'react-redux'

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
                  <h2 style={{marginBottom: '2%', textAlign:'center'}} >Tem certeza que deseja fechar essa campanha? </h2>
                  <p style={{marginBottom: '2%',fontSize: '11px', textAlign: 'center'}} >Ao fechar essa campanha, o sorteio dos prêmios será realizado <strong style={{color: '#CE0C0C'}}>automaticamente</strong> por nossa plataforma.</p>
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
    const {campanha} = props;
    const profile = useSelector(state => state.user.profile);
    const [excluirSolic, setExcluirSolic] = React.useState(false)
    const handleExcluir = async () => {
        try {
          const response = await api.put(`/campaign?campaignId=${campanha.id}`)
          setOpenModalWinners(true)
          window.location.reload()
        } catch (error) {
          console.log(error.response.data.error)
        }
    }
  
    const [openModal, setOpenModal] = React.useState(false)
    const [openModalWinners, setOpenModalWinners] = React.useState(false)
    const [users, setUsers] = React.useState([])
    const [winners, setWinners] = React.useState([])

    const [errorMessage, setErrorMessage] = React.useState('');
    const [openFailure, setOpenFailure] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);

    const handleClickCampanha = async () => {
      if (!campanha.is_open) {
        try {
          const response = await api.get(`/campaign-winners?campaignId=${campanha.id}`)
          setOpenModalWinners(true)
          setWinners(response.data.winners)
          console.log(response.data.winners)
        } catch (error) {
          console.log(error.response.data.error)
        }
        return
      }

      if (profile.admin) {
        // mostrar a modal de usuarios participantes
        setOpenModal(true)
        try {
          const response = await api.get(`/campaign-donators?campaignId=${campanha.id}`)
          setUsers(response.data.users)
          console.log(response.data.users)
        } catch (error) {
          console.log(error.response.data.error)
        }

      } else {
        // tentar ingressar nela
        const formData = {
          donatorId: profile.donator.id,
          campaignId: campanha.id
        }
        try {
          const response = await api.post('/campaign-join', formData)
          setOpenSuccess(true)
          console.log(response.data)
        } catch (error) {
          setErrorMessage(error.response.data.error)
          setOpenFailure(true)
          console.log(error.response.data.error)
        }
      }
    }

    function datediff(first, second) {        
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  
  function parseDate(str) {
      var mdy = str.split('-');
      return new Date(mdy[0], mdy[1] - 1, mdy[2]);
  }
  var bgCor = '#FFFFFF'
  if(!campanha.is_open){
    bgCor='rgba(204, 0, 0, 0.1)'
  }

    return(
        <ThemeProvider theme={theme}>
            <CardPrincipal sx={{ borderRadius: 3, backgroundColor: bgCor,":hover": {filter: "brightness(70%)"}}}>
            {profile.admin? 
            <div>
              <IconButton onClick={() => setExcluirSolic(true) } style={{color:'rgba(204, 0, 0, 1)'}}><CloseIcon fontSize="medium"/></IconButton>
              <IconButton onClick={() => handleClickCampanha() } style={{color:'rgba(0, 204, 0, 1)'}}><PeopleIcon fontSize="medium"/></IconButton></div>:<div>
                <IconButton onClick={() => handleClickCampanha() } style={{color:'rgba(204, 0, 0, 1)'}}><GroupAddIcon fontSize="medium"/></IconButton>
              </div>}
            <img src={campaignPhoto} style={{width:'100%'}}></img>
                <CardContent sx={{pt:1, pb: 0}}>
                {campanha.is_open?
                <Typography gutterBottom variant="h5" component="div" className="title">
                    {campanha.name}
                </Typography>:
                <Typography gutterBottom variant="h5" component="div" className="title">
                  {campanha.name} &#40;campanha encerrada&#41;
                </Typography>
                }
                </CardContent>
                <CardContent sx={{ paddingBottom: 1, minHeight: 95, p: 0, mt:1}}>
                  
                    {campanha.reward?
                      <div>
                        <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                          <strong>Prêmio:</strong> {campanha.reward}
                        </Typography>
                        <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                          <strong>Nº de ganhadores: </strong>{campanha.number_winners}
                        </Typography>
                      </div>:
                    <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                      <strong>Campanha solidária</strong>
                    </Typography>}
                    <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                       <strong>Lugar de doação:</strong> {campanha.donation_place}
                    </Typography>
                <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                <strong>Descricão:</strong> {campanha.description}
                    </Typography>
                </CardContent>
                <div className='bottominfos'>
                  <CardContent sx={{ p: 0}}>
                      <p variant="body2" className='publicado'>{campanha.start_date} a {campanha.end_date}</p>
                  </CardContent>
                  <CardContent sx={{ p: 0}}>
                      <p  className='publicado'>{datediff(parseDate(campanha.start_date), parseDate(campanha.end_date))} dias restantes</p>
                  </CardContent>
                </div>
            </CardPrincipal>

           <ShowDonators open={openModal && profile.admin} handleClose={() => setOpenModal(false)} users={users} name="Doadores"/>
            <ShowDonators open={openModalWinners && profile.admin} handleClose={() => setOpenModalWinners(false)} users={winners} name="Ganhadores" />

            <Snackbar open={openFailure} autoHideDuration={6000} onClose={()=>{setOpenFailure(false)}}>
                <Alert onClose={()=>{setOpenFailure(false)}} severity="error" variant="filled" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={()=>{setOpenSuccess(false)}}>
                <Alert onClose={()=>{setOpenSuccess(false)}} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Você se juntou à campanha!
                </Alert>
            </Snackbar>
            <ModalExcluir open={excluirSolic} handleClose={() => setExcluirSolic(false)} handleExcluir={handleExcluir}/>
        </ThemeProvider>
    )
}

export default Cards