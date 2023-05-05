import api from '../../../services/api';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Container } from './styles'
import AddIcon from '@mui/icons-material/Add';
import Post from './PostCampanha'
import Card from '../../CardCampanha'

import {
  Grid,
  IconButton,
  Tooltip
}from '@mui/material';

export default function Campanhas () {
  const profile = useSelector(state => state.user.profile)
  const [idAdmin, setIsAdmin] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [minhas_campanhas, setMinhas_campanhas] = useState([])

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        if (profile.admin) {
          setIsAdmin(true)
          const response = await api.get(`/campaign?adminId=${profile.admin.id}`)
          console.log(response.data.data);
          setMinhas_campanhas(response.data.data)
        } else {
          const response = await api.get(`/campaign`)
          console.log(response.data.data);
          setMinhas_campanhas(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCampaigns()
  }, [profile.admin]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      {profile.admin && (
      <div className='add'>
        <div>
          <h1>Campanhas de doação</h1>
          <h4>Aqui você pode fazer uma campanha de doação sanguínea!</h4>
        </div>
        {isMobile ? 
          <IconButton sx={{position: 'fixed',bottom: "2%", right: 0}} aria-label="formulario" className='button' onClick={() => setOpenModal(true)} >
            <AddIcon sx={{color:'#fff'}} />
          </IconButton>:
        <Tooltip title="Postar uma campanha">
          <IconButton aria-label="formulario" className='button' onClick={() => setOpenModal(true)} >
            <AddIcon sx={{color:'#fff'}} />
          </IconButton>
        </Tooltip>
        }
      </div>
      )}
      {!profile.admin && (
        <div>
          <h1>Campanhas de doação</h1>
          <h4>Aqui você pode participar de uma campanha de doação sanguínea!</h4>
        </div>
      )}
      <div>
        <Grid container spacing={ 2} rowSpacing={0} className='grid'>
          {minhas_campanhas.reverse().map((item,i) =>(
            <Grid item key={i}  xs={12} md={4}  xl={4} >
              <Card campanha={item}/>
            </Grid>            
        ))}
        </Grid>
      </div>
      <Post open={openModal} handleClose={() => setOpenModal(false)} />
    </Container>
  );
}


