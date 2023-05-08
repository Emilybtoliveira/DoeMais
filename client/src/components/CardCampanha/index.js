import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardPrincipal } from './styles';
import campaignPhoto from '../../assets/Feed/campaignPhoto.png'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../../services/api'

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

function Cards(props) {
    const {campanha} = props;
    const profile = useSelector(state => state.user.profile);

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
            <CardPrincipal sx={{ borderRadius: 3, backgroundColor: bgCor,":hover": {filter: "brightness(70%)"}}} onClick={handleClickCampanha}>
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

            <ShowDonators open={openModal} handleClose={() => setOpenModal(false)} users={users} name="Doadores"/>
            <ShowDonators open={openModalWinners} handleClose={() => setOpenModalWinners(false)} users={winners} name="Ganhadores" />

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
        </ThemeProvider>
    )
}

export default Cards