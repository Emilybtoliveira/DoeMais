import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {Container} from './styles'
import Header from '../../components/Header'
import api from '../../services/api';
import bcrypt from 'bcryptjs'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { 
    Grid,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormHelperText,
    FormControl,
    IconButton,
    Snackbar,
    Alert,
    Button
 } from '@mui/material';

function FormRecoverPassword (){
    const navigate = useNavigate()
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [message, setMessage] = useState(null)

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [senha, setSenha] = useState('');
    const [repetirSenha, setRepetirSenha] = useState('');
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const [errorRepetirSenha, setErrorRepetirSenha] = useState("")
    const [errorSenha, setErrorSenha] = useState("")

    const theme = createTheme({
 
        palette: {
          primary: {
            main: 'rgba(197, 23, 23, 0.81)',
            darker: '#053e85',
          },
        
        },
      });

    const handleValidar =  () => {
        let isValid = true      

        if(!senha){
            setErrorSenha("Preencha esse campo!")
            isValid = false
        }else{
            setErrorSenha("")
        }
        
        if(!repetirSenha){
            setErrorRepetirSenha("Preencha esse campo!")
            isValid = false
        }else if(errorRepetirSenha){
            isValid = false
        }
        
        handleSubmit(isValid)
    }

    const handleSubmit = async (isValid) =>{
        if(isValid){
            const params = new URLSearchParams(window.location.search);
            const email = params.get('email');
            const codigo = params.get('codigo');

            const formData = {
                password: await bcrypt.hash(senha, "$2a$08$bEnwhtx4TktxTs0MU6KuJu"), 
              };
              try {
                const response = await api.post(`/recover-password?email=${email}&codigo=${codigo}`, formData);
                setMessage(response.data.message)
                setOpenSuccess(true)
              } catch (error) {
                setMessage(error.response.data.error)
                setOpenError(true)
              }
        }
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        if (openSuccess) {
            navigate("/login");
            return;
        }
        
        navigate("/")
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleValidar();
        }
    };

    const handleSenha = (e) =>{
        const senha_ = e.target.value;
        setSenha(senha_)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRepetirSenha = (e) => {
        if(e.target.value !== senha){
            setErrorRepetirSenha('Senhas diferentes')
        }else{
            setErrorRepetirSenha('')
        }
        setRepetirSenha(e.target.value)
    }

    return (
        <div>
            <Header/>
            <ThemeProvider theme={theme}>
                <Container>
                    <h1>Nova senha</h1>
                    <Grid container spacing={2} onKeyPress={handleKeyPress} >
                        <Grid item xs={12} md={12}>
                            <FormControl  fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password" sx={{background:'white'}}>Senha</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'} 
                                    value={senha}   
                                    onChange={handleSenha}
                                    
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                    error={errorSenha}
                                    helperText={errorSenha || ''}
                                />
                                {errorSenha && <FormHelperText error>{errorSenha}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                        <FormControl  fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password" sx={{background:'white',pr: 1}}>Repetir senha</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword2 ? 'text' : 'password'}  
                                    value={repetirSenha}
                                    onChange={handleRepetirSenha} 
                                    helperText={errorRepetirSenha? errorRepetirSenha: false}
                                    error={errorRepetirSenha? true: false}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword2}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                />
                                {errorRepetirSenha && <FormHelperText error>{errorRepetirSenha}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button variant="contained"  className='button' onClick={handleValidar}>Confirmar</Button>

                    <Snackbar
                        open={openSuccess}
                        autoHideDuration={2000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="success">
                            {message}
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={openError}
                        autoHideDuration={2000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="error">
                            {message}
                        </Alert>
                    </Snackbar>
                </Container>
            </ThemeProvider>
        </div>
      );
}

export default FormRecoverPassword