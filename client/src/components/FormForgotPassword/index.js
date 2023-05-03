import React, {useState} from 'react';
import {Container} from './styles'
import {TextField, 
    Grid,
    Button,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../../services/api';
import { useNavigate } from "react-router-dom";


const theme = createTheme({

    palette: {
    primary: {
        main: 'rgba(197, 23, 23, 0.81)',
        darker: '#053e85',
    },
    
    },
});
function FormForgotPassword (){
    const navigate = useNavigate()

    const [data, setData] = useState({
        email:sessionStorage.getItem('emailLogin') || '', 
    })
    
    const [errorEmail, setErrorEmail] = useState("")
    
    const [message, setMessage] = React.useState('');
    const [openFailure, setOpenFailure] = React.useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
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
            setIsLoading(true);
            const formData = {
                email: data.email,
            };
            const response = await api.post("/forgot-password", formData).then(function (response) {
                setIsLoading(false);
                setMessage(response.data.message)
                setOpenSuccess(true)
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/");
                  }, 4000);
                })
                .catch(function (error) {
                    setIsLoading(false)
                    setMessage(error.response.data.error)
                    setOpenFailure(true)
                    console.log(error.response.data.error)
                });
            
            
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
            {isLoading && <CircularProgress/>}
            <h1>Esqueci minha senha</h1>
            <Grid container spacing={2} onKeyPress={handleKeyPress} >
                <Grid item xs={12} md={12}>
                    <TextField required fullWidth label="Email" variant="outlined" 
                    error={errorEmail? true: false}
                    helperText={errorEmail? errorEmail: false}
                    value={data.email}
                    onChange={handleEmail} />
                </Grid>
            </Grid>
            <Button variant="contained" className='button' onClick={handleValidar}>Redefinir Senha</Button>
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

export default FormForgotPassword