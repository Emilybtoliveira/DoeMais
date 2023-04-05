import React, { useState } from 'react'
import {IconButton,Tooltip,Grid  }from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Container } from './styles';
import Post from './PostSolicitacao'
import api from '../../../services/api'
import {useSelector} from 'react-redux'
import Card from '../../CardSolicitacao'
export default function Solicitacoes () {
  const [openModal, setOpenModal] = useState(false)
  const [minhas_solicitacoes, setMinhas_solicitacoes] = useState([])
  const [isMobile, setIsMobile] = React.useState(false);
  const id_user = useSelector(state => state.user.id_user);

  React.useEffect(() => {
    const response = api.get(`/solicitations?userId=${id_user}`).then((response) => {
      console.log(response);
      setMinhas_solicitacoes(response.data.data)
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
      <Container>
        <div className='add'>
          <div>
            <h1>Minhas Solicitações</h1>
            <h4>Aqui você pode postar uma solicitação de doação sanguínea!</h4>
          </div>
          {isMobile ? 
            <IconButton sx={{position: 'fixed',bottom: "2%", right: 0}} aria-label="formulario" className='button' onClick={() => setOpenModal(true)} >
              <AddIcon sx={{color:'#fff'}} />
            </IconButton>:
          <Tooltip title="Postar uma solicitação">
            <IconButton aria-label="formulario" className='button' onClick={() => setOpenModal(true)} >
              <AddIcon sx={{color:'#fff'}} />
            </IconButton>
          </Tooltip>
          }
        </div>
        <div >
          <Grid container spacing={ 2} rowSpacing={0} className='grid'>
            {minhas_solicitacoes.reverse().map((item,i) =>(
              <Grid item key={i}  xs={12} md={4}  xl={4} >
                <Card  solicitacao={item}/>
              </Grid>            
          ))}
          </Grid>
        </div>
        <Post open={openModal} handleClose={() => setOpenModal(false)} />
      </Container>
    )
}


