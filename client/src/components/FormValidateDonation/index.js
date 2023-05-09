import React, {useState} from 'react';
import {Container} from './styles'
import {TextField, 
    Grid,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../../services/api';
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme({

    palette: {
    primary: {
        main: 'rgba(197, 23, 23, 0.81)',
        darker: '#053e85',
    },
    
    },
});
function FormValidateDonation (){
    const navigate = useNavigate()
    const { id } = useParams();

    const [data, setData] = useState({
        email:sessionStorage.getItem('emailLogin') || '', 
    })
    
    const [errorEmail, setErrorEmail] = useState("")
    const [message, setMessage] = React.useState('');

    const [openFailure, setOpenFailure] = React.useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        });
        const { vertical, horizontal } = state;
    
    const handleValidar =  () => {
        let isValid = true

        if(!data.email){
            setErrorEmail("Preencha esse campo!")
            isValid = false
        }else if(errorEmail){
            isValid = false
        }
        handleSubmit(isValid)
    }

    const handleSubmit = async (isValid) =>{
        
        if(isValid){
            const formData = {
                email: data.email,
            };
            try {
                const response = await api.post(`/validate-donation-register/${id}`, formData);
                setOpenSuccess(true)
                setMessage(response.data.message)
                console.log(response.data);

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } catch (error) {
                setOpenFailure(true)
                setMessage(error.response.data.error)
                console.log(error.response.data.message)
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleValidar();
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        navigate("/")
    };
    
    const handleEmail = (e) =>{
        const email_ = e.target.value;
        let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email_) ;
        setData({...data, email: email_})
        if(!regex){
            setErrorEmail('Email incorreto')
        }else{
            setErrorEmail('')
        }
        sessionStorage.setItem("email", email_)
    }

    return(
        <ThemeProvider theme={theme}>
            <Container>
            <h1>Adicionar Doação</h1>
            <Grid container spacing={2} onKeyPress={handleKeyPress} >
                <Grid item xs={12} md={12}>
                    <TextField required fullWidth label="Email" variant="outlined" 
                    error={errorEmail? true: false}
                    helperText={errorEmail? errorEmail: false}
                    value={data.email}
                    onChange={handleEmail} />
                </Grid>
            </Grid>
            <Button variant="contained" className='button' onClick={handleValidar}>Adicionar</Button>
            <Snackbar anchorOrigin={{ vertical, horizontal }}  key={vertical + horizontal} open={openFailure} autoHideDuration={3000}>
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical, horizontal }}  key={vertical + horizontal} open={openSuccess} autoHideDuration={3000}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>    
        </ThemeProvider>
        
    )
}

export default FormValidateDonation