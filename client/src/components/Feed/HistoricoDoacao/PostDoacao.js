import React, { useState,useRef  } from 'react'
import {Modal,  }from '@mui/material';
import { ContentModal } from './styles';
import {
    TextField, 
    Grid,
    Button,   
 } from '@mui/material';
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

export default function Solicitacoes (props) {
    const {open, handleClose} = props;
    const id_user = useSelector(state => state.user.id_user);
    const [data, setData] = useState({ 
        hospital:sessionStorage.getItem('hospital') || '',  
    })
    const [openSuccess, setOpenSuccess] = useState(false);
    const StyledButton = styled(Button)({
        width: '100%',
        color: '#000',
        '&:hover': {
          backgroundColor: '#2c3e50',
        },
      });
    
    const [errorCidade, setErrorHospital] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleValidar =  () => {
        let isValid = true      
        if(!data.hospital){
            setErrorHospital("Preencha esse campo!")
            isValid = false
        }else{
            setErrorHospital("")
        }
    }

    const handleSubmit = async (isValid) =>{
        if(isValid){
            // console.log(data)
            // setIsLoading(true);

            const formData = {
                hospital: data.hospital,
              };
              try {
                const response = await api.post('/solicitations', formData);
                sessionStorage.removeItem('hospital')
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
        setData({...data, hospital: hospital})
        sessionStorage.setItem("hospital", hospital)
    }


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
                    
                    <Grid item xs={12}>
                        <TextField
                        label="Local de doação"
                        name="Hospital"
                        fullWidth
                        value={data.hospital}
                        onChange={handleHospital}
                        />
                    </Grid>
                    
                    <Grid item xs={6}>
                    <input type ="date"style={{height: "55px", width:"150px", textAlign: "center", fontSize:"1em"}}></input>
                        
                    </Grid>
                
                    <Grid item xs={6}>
                            <div style={{display: "flex", justifyContent: 'center'}}>
                                <Button onClick={handleValidar}  variant="contained" style={{height: "55px",  width:"150px"}}>Registrar</Button>
                            </div>
                    </Grid>
                </Grid>
                </ContentModal>
         </Modal>
        
        </ThemeProvider>
    )
       
}


