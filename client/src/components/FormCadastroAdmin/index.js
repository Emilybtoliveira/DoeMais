import React, {useState} from 'react';
import {Container} from './styles'
import InputMask from 'react-input-mask';
import {TextField, 
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormHelperText,
    FormControl,
    IconButton ,
    Select,
    MenuItem,
    Snackbar,
    Alert 
 } from '@mui/material';
 import CircularProgress from '@mui/material/CircularProgress';

 import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as options from '../../utils/options'
import bcrypt from 'bcryptjs';
import api from '../../services/api'
import { useNavigate } from "react-router-dom";


const theme = createTheme({
 
    palette: {
      primary: {
        main: 'rgba(197, 23, 23, 0.81)',
        darker: '#053e85',
      },
    
    },
  });

function FormCadastroAdmin (){
    const navigate = useNavigate()
    
    const [data, setData] = useState({
        nome: sessionStorage.getItem('nome') || '', 
        email:sessionStorage.getItem('email') || '', 
        senha_cripto: '', 
        telefone: sessionStorage.getItem('telefone') || ''
    })
    
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [senha, setSenha] = useState('');
    const [repetirSenha, setRepetirSenha] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    
    const [errorRepetirSenha, setErrorRepetirSenha] = useState("")
    const [errorNome, setErrorNome] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorSenha, setErrorSenha] = useState("")

    const [errorMessage, setErrorMessage] = React.useState('');
    const [openFailure, setOpenFailure] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        });
    const { vertical, horizontal, open } = state;
    


    const handleValidar =  () => {
        let isValid = true      

        if(!data.nome){
            setErrorNome("Preencha esse campo!")
            isValid = false
        }else{
            setErrorNome("")
        }

        if(!data.email){
            setErrorEmail("Preencha esse campo!")
            isValid = false
        }else if(errorEmail){
            isValid = false
        }

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
            setIsLoading(true);
            const formData = {
                name: data.nome,
                email: data.email, 
                password: await bcrypt.hash(senha, "$2a$08$bEnwhtx4TktxTs0MU6KuJu"),
                phone: data.telefone,
              };
              try {
                const response = await api.post('/register-admin', formData);
                
                sessionStorage.removeItem('nome')
                sessionStorage.removeItem('email')
                sessionStorage.removeItem('telefone')
                setOpenSuccess(true)
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/login");
                  }, 2000);
              } catch (error) {

                setErrorMessage(error.response.data.error)
                setOpenFailure(true)
                setIsLoading(false)
              }
        }
    }


    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleValidar();
        }
      };

    const handleNome = (e) =>{
        const nomeCompleto = e.target.value;
        setData({...data, nome: nomeCompleto})
        sessionStorage.setItem("nome", nomeCompleto)
        if(!errorNome){
            
        }
    }

    
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

    const handleSenha = (e) =>{
        const senha_ = e.target.value;
        setSenha(senha_)

    }

    const handleTelefone = (e) =>{
        const telefone_ = e.target.value;
        setData({...data, telefone: telefone_})
        sessionStorage.setItem("telefone", telefone_)
    }

    const handleRepetirSenha = (e) => {
        if(e.target.value !== senha){
            setErrorRepetirSenha('Senhas diferentes')
        }else{
            setErrorRepetirSenha('')
        }
        setRepetirSenha(e.target.value)
    }


    return(
        <ThemeProvider theme={theme}>
            <Container>
            {isLoading && <CircularProgress />}
            {/* {!isLoading && ( */}
            <h1>Cadastro</h1>
            <Grid container spacing={2} onKeyPress={handleKeyPress} >
                <Grid item xs={12} md={12} >
                    <TextField 
                    label="Nome Completo"
                    name="nome"
                    required
                    fullWidth
                    error={errorNome? true: false}
                    helperText={errorNome? errorNome: false}
                    value={data.nome}
                    onChange={handleNome}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField required fullWidth label="Email" variant="outlined" 
                    error={errorEmail? true: false}
                    helperText={errorEmail? errorEmail: false}
                    value={data.email}
                    onChange={handleEmail} />
                </Grid>
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
                <Grid item xs={6} md={6} >
                <TextField
                label="Telefone"
                variant="outlined"
                InputProps={{
                    inputComponent: InputMask,
                    inputProps: {
                    mask: '(99) 99999-9999',
                    },
                }}
                value={data.telefone}
                onChange={handleTelefone}
                />
                </Grid>
            </Grid>
            <Button variant="contained"  className='button' onClick={handleValidar}>Cadastrar</Button>
           
            <Snackbar anchorOrigin={{ vertical, horizontal }}  key={vertical + horizontal} open={openFailure} autoHideDuration={6000} onClose={()=>{setOpenFailure(false)}}>
                    <Alert onClose={()=>{setOpenFailure(false)}} severity="error" variant="filled" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical, horizontal }}  key={vertical + horizontal} open={openSuccess} autoHideDuration={6000} onClose={()=>{setOpenSuccess(false)}}>
                    <Alert onClose={()=>{setOpenSuccess(false)}} severity="success" variant="filled" sx={{ width: '100%' }}>
                        Cadastro realizado com sucesso!
                    </Alert>
            </Snackbar>
        </Container>    
        </ThemeProvider>
        
    )
}

export default FormCadastroAdmin


