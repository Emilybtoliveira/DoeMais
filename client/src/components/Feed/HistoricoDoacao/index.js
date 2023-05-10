import React, { useState } from 'react'
import { Container, List } from './styles';
import {IconButton,Tooltip, Grid }from '@mui/material';
import {useSelector} from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import api from '../../../services/api'
import Post from './PostDoacao'
import vazio from '../../../assets/Feed/vazio.svg'
import DonationListItem from '../../DonationListItem';
import CircularProgress from '@mui/material/CircularProgress';


export default function Doacoes () {
    const [openModal, setOpenModal] = useState(false)
    const [minhas_doacoes, setMinhas_doacoes] = useState([])
    const profile = useSelector(state => state.user.profile);
    const [isLoading, setIsLoading] = React.useState(true);

    const id_user = useSelector(state => state.user.id_user);
    React.useEffect(() => {
        const response = api.get(`/donation-register?idDonator=${profile.donator.id}`).then((response) => {
          console.log(response);
          setMinhas_doacoes(response.data)
        }).catch((error) => {
          console.log(error)
        })
      }, []);
    
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);
     
    
    return (
      <Container>
        <div className='headers'>
          <h1 className='mainTitle'>Meu histórico de doações</h1>
          <h4 className='descTitle'>Aqui você pode registrar suas doações já feitas.</h4>
        </div>
        <div>
        <Tooltip title="Postar uma solicitação">
            <IconButton aria-label="formulario" className='button' onClick={() => setOpenModal(true)}>
              <AddIcon sx={{color:'#fff'}} />
            </IconButton>
          </Tooltip>
        </div>
        <Post open={openModal} handleClose={() => setOpenModal(false)} />
        {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress style={{ color: 'red' }}/>
        </div>
         ) :
        minhas_doacoes.length>0?(
        <Grid container>
          {minhas_doacoes.sort((a, b) => new Date(a.date) - new Date (b.date)).reverse().map(donation => <Grid item xs={12}>
            <DonationListItem date={donation.date} location={donation.place} id={donation.id} validated={donation.validated}/>
          </Grid>)}
        </Grid>):(
          <div className='vazio'>
            {/* {all_solicitacoes? alert('Ainda não temos solicitações cadastradas.')  : '' } */}
            <img src={vazio} alt='sem solicitações'/>
            <h4>Você ainda não registrou nenhuma doação sanguínea.</h4>
          </div>)
        }
      </Container>
    )
}


