import React, {useState} from 'react';
import {Container} from './styles'
import {TextField, 
    Grid,
    Button,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormHelperText,
    FormControl,
    IconButton ,

 } from '@mui/material';
 import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux'
import { logIn } from '../../store/actions/authActions';
import {Link} from 'react-router-dom'
import bcrypt from 'bcryptjs';
import api from '../../services/api';
const theme = createTheme({
 
    palette: {
      primary: {
        main: 'rgba(197, 23, 23, 0.81)',
        darker: '#053e85',
      },
    
    },
  });

function FormCadastro (){
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email:sessionStorage.getItem('email') || '', 
        senha_cripto: sessionStorage.getItem('senha') || '', 
        })
    
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const [errorEmail, setErrorEmail] = useState("")
    const [errorSenha, setErrorSenha] = useState("")


    const handleValidar =  () => {
        
        let isValid = true      


        if(!data.email){
            setErrorEmail("Preencha esse campo!")
            isValid = false
        }else if(errorEmail){
            isValid = false
        }

        if(!data.senha_cripto){
            setErrorSenha("Preencha esse campo!")
            isValid = false
        }else{
            setErrorSenha("")
        }

          handleSubmit(isValid)
    }

    const handleSubmit = async (isValid) =>{
        
        if(isValid){
            const formData = {
                email: data.email, 
                password: await bcrypt.hash(data.senha_cripto, "$2a$08$bEnwhtx4TktxTs0MU6KuJu"), 
              };
              console.log(formData);
            const response = await api.post("/login", formData).then(function (response) {
                console.log(response);
                dispatch(logIn())
                })
                .catch(function (error) {
                console.error(error);
                });
            
            
              dispatch(logIn())
        }
    }



    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    
    
    const handleEmail = (e) =>{
        console.log(e.target.value)
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
        setData({...data, senha_cripto: senha_})

    }

    

    return(
        <ThemeProvider theme={theme}>
            <Container>
            <h1>Login</h1>
            <Grid container spacing={2} >
                
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
                            value={data.senha_cripto}   
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
                </Grid>
            <Button variant="contained" className='button' onClick={handleValidar} >Cadastrar</Button>
            <h4 style={{fontWeight: '400', marginTop: '5%'}}>Ainda não é cadastrado? <Link to='/cadastro' style={{color: 'red'}}>Cadastre-se</Link></h4>
        </Container>    
        </ThemeProvider>
        
    )
}

export default FormCadastro



