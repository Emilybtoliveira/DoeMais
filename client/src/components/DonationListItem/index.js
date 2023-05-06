import React from 'react';
import styled from 'styled-components'
import {Textos, ContentModal} from './styles';
import icon from './blood_drop_donation_icon.svg';
import { durationInMonths } from '@progress/kendo-date-math';
import {Grid, Button, Modal} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from '../../assets/logo.svg'
import api from '../../services/api'
import PostEditDoacao from './PostEditDoacao'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
                    <h2 style={{marginBottom: '5%'}} >Tem certeza que deseja excluir esse registro de doação?</h2>
                    <div style={{display: "flex"}}>
                      <Button onClick={props.handleExcluir}  variant="contained" sx={{mr: '10%'}}  >Sim</Button>
                      <Button onClick={props.handleClose}  variant="outlined" >Cancelar</Button>
                    </div>
                </div>
            </ContentModal>
        </Modal>
    )
  }

function DonationListItem (props){
    const doacao = props;
    var date_list = props.date.split("-")

    const start = new Date(date_list[0], date_list[1], date_list[2]);
    const current = new Date();
    const end = new Date (current.getFullYear(), current.getMonth()+1, current.getDate());
    const duration = durationInMonths(start, end);
    const [excluirDonat, setExcluirDonat] = React.useState(false)
    const [editarDonat, setEditarDonat] = React.useState(false)
    const handleExcluir = async () => {
        const response = await api.delete(`/donation-register/${doacao.id}`).then(response => {
          window.location.reload()
        }).catch(error =>{
          console.log(error)
          console.log('f')
        })
      }
    let duracaodoacao;
    console.log(doacao.id)
    if (duration == 1) {
        duracaodoacao = <p className='solong'>Há {duration} mês</p>;    
    } 
    else if (duration>1){
        duracaodoacao = <p className='solong'>Há {duration} meses</p>;    
    }
    else{
        duracaodoacao = <p className='solong'>Há menos de um mês</p>;  
    }
    

    return(
        <ThemeProvider theme ={theme}>
            <Textos>
                <Grid container className='first'
                spacing={0}
                direction="row"
                alignItems="center"
                  justifyContent="center">
                    <Grid item xs={1}>
                    <img src = {icon} ></img>
                    </Grid>
                    <Grid item xs ={8}>
                        <h1>Doação dia {date_list[2]}/{date_list[1]}/{date_list[0]}</h1>
                        <h3>{props.location}</h3>
                    </Grid>
                    <Grid item xs ={2}>
                        {duracaodoacao}
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{textAlign:'right'}}>
                            <IconButton onClick={() => setEditarDonat(true) } style={{color:'#363636'}}><EditIcon fontSize="small"/></IconButton>
                            <IconButton onClick={() => setExcluirDonat(true)} style={{color:'rgba(204, 0, 0, 1)'}}><DeleteIcon fontSize="small" /></IconButton>
                        </div>
                    </Grid>
            
                </Grid>
                <ModalExcluir open={excluirDonat} handleClose={() => setExcluirDonat(false)} handleExcluir={handleExcluir}/>
                <PostEditDoacao idonation = {doacao.id} date ={doacao.date} hospital = {doacao.place} open={editarDonat} handleClose={() => setEditarDonat(false)}/>
            
            </Textos>
        </ThemeProvider>   
    )
}

export default DonationListItem