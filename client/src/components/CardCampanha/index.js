import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardPrincipal } from './styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../../services/api'

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

    const handleClickCampanha = async () => {
      if (profile.admin) {
        // mostrar a modal de usuarios participantes
        try {
          const response = await api.get(`/campaign-donators?campaignId=${campanha.id}`)
          console.log(response.data)
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
          console.log(response.data)
        } catch (error) {
          console.log(error.response.data.error)
        }
      }
    }

    return(
        <ThemeProvider theme={theme}>
            <CardPrincipal sx={{ borderRadius: 3, ":hover": {filter: "brightness(70%)"}}} onClick={handleClickCampanha}>
                <CardContent sx={{pt:1, pb: 0}}>
                <Typography gutterBottom variant="h5" component="div" className="title">
                    {campanha.name}
                </Typography>
                </CardContent>
                <CardContent sx={{ paddingBottom: 1, minHeight: 95, p: 0, mt:1}}>
                    <Typography variant="body2" gutterBottom color="text.secondary" className="descricao">
                        {campanha.description}
                    </Typography>
                </CardContent>
                <CardContent sx={{ p: 0}}>
                    <Typography variant="body2" className='publicado'>{campanha.start_date} - {campanha.end_date}</Typography>
                </CardContent>
            </CardPrincipal>
        </ThemeProvider>
    )
}

export default Cards