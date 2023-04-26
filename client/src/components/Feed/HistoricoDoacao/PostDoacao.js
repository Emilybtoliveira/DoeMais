import React, { useState,useRef  } from 'react'
import {Modal,  }from '@mui/material';
import { ContentModal } from './styles';
import {
    TextField, 
    Grid,
    Button,   
 } from '@mui/material';
import logo from '../../../assets/logo.svg'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components'
import api from '../../../services/api'
import {useSelector} from 'react-redux'
 const theme = createTheme({
 
    palette: {
      primary: {
        main: 'rgba(197, 23, 23, 0.81)',
        darker: '#053e85',
      },
      secondary: {
        main: 'rgba(107, 107, 107, 1)',
        darker: 'rgba(204, 0, 0, 1)',
      },
    
    },
  });

  const ModalSucesso = (props) =>{
    return(
        <Modal
            open={props.open}
            onClose={props.handleCloseSuccess}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ContentModal>
                <img src={logo} alt="logo" style={{marginBottom: '2%'}} />
                <div style={{display: "flex", justifyContent: 'center', alignItems:'center', flexDirection:'column'}} >                   
                    <h2 style={{marginBottom: '2%'}} >Parabéns! Sua doação sanguínea foi registrada. </h2>
                    <p style={{marginBottom: '2%',fontSize: '11px', textAlign: 'center'}} >Mantenha seu registro sempre atualizado para assim saber quando estará disponível para doar novamente!<strong style={{color: '#CE0C0C'}}></strong></p>
                    <div style={{display: "flex", justifyContent: 'flex-end'}}>
                                    <Button onClick={props.handleCloseSuccess}  variant="contained" >Ok!</Button>
                    </div>
                </div>
            </ContentModal>
        </Modal>
    )
}

export default function Solicitacoes (props) {
    const {open, handleClose} = props;
    const id_user = useSelector(state => state.user.id_user);
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear()
    const [data, setData] = useState({ 
        place:sessionStorage.getItem('hospital') || '',
        date:sessionStorage.getItem('date') || `${year}-${month<10?`0${month}`:`${month}`}-${date}` 
    })
    const [openSuccess, setOpenSuccess] = useState(false);
    const StyledButton = styled(Button)({
        width: '100%',
        color: '#000',
        '&:hover': {
          backgroundColor: '#2c3e50',
        },
      });
    
    const [errorHospital, setErrorHospital] = useState("")
    const [errorDate, setErrorDate] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleValidar =  () => {
        let isValid = true      
        if(!data.place){
            setErrorHospital("Preencha esse campo!")
            isValid = false
        }else{
            setErrorHospital("")
        }
        handleSubmit(isValid)
    }
    
    const handleSubmit = async (isValid) =>{
        if(isValid){
            // console.log(data)
            // setIsLoading(true);

            const formData = {
                idUser: id_user,
                place: data.place,
                date: data.date
              };
              try {
                const response = await api.post(`/donation-register`, formData);
                sessionStorage.removeItem('place')
                sessionStorage.removeItem('date')
                console.log("Sucesso")
                setOpenSuccess(true)
              
                // setOpenSuccess(true)
                // setTimeout(() => {
                //     setIsLoading(false);
                //     navigate("/login");
                //   }, 2000);
              } catch (error) {
                console.log(error);
                // setErrorMessage(error.response.data.error)
                // setOpenFailure(true)
                setIsLoading(false)
              }
        }
    }

    const handleHospital = (e) =>{
        const hospital = e.target.value;
        setData({...data, place: hospital})
        sessionStorage.setItem("hospital", hospital)
    }
    const handleDate = (e) =>{
      const date = e.target.value;
      setData({...data, date: date})
      sessionStorage.setItem("date", date)
      console.log(date)
  }
  ;


    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{width: '750px', margin:'auto'}}

            >
            <ContentModal>
            <h1>Registrar doação</h1>
            <h4 style={{marginBottom: '5%'}} >Informe a data e local da sua doação</h4>
                <Grid container spacing={2}>
                    
                    
                    
                    <Grid item xs={6}>
                    <input type ="date"
                      fullWidth
                      
                      value={data.date}
                      error={errorDate? true: false}
                      helperText={errorDate? errorDate: false}
                      onChange={handleDate}
                    style={{height: "55px", width:"165px", textAlign: "center", fontSize:"1em"}}></input>
                        
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        label="Local de doação"
                        name="Hospital"
                        fullWidth
                        value={data.place}
                        required
                        error={errorHospital? true: false}
                        helperText={errorHospital? errorHospital: false}
                        onChange={handleHospital}
                        />
                    </Grid>
                
                    <Grid item xs={12}>
                            <div style={{display: "flex", justifyContent: 'center'}}>
                                <Button onClick={handleValidar}  variant="contained" style={{height: "55px",  width:"150px"}}>Registrar</Button>
                            </div>
                    </Grid>
                    
                
                </Grid>
                </ContentModal>
         </Modal>
         <ModalSucesso open={openSuccess} handleCloseSuccess={() => window.location.reload()}/>
        
        </ThemeProvider>
    )
       
}

