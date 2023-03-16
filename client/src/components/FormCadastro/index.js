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
    MenuItem 
 } from '@mui/material';
 import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as options from '../../utils/options'
import bcrypt from 'bcryptjs';

const theme = createTheme({
 
    palette: {
      primary: {
        main: 'rgba(197, 23, 23, 0.81)',
        darker: '#053e85',
      },
    
    },
  });

function FormCadastro (){
    const [data, setData] = useState({
        nome: sessionStorage.getItem('nome') || '', 
        email:sessionStorage.getItem('email') || '', 
        senha_cripto: '', 
        genero: sessionStorage.getItem('genero') || '', 
        telefone: sessionStorage.getItem('telefone') || '', 
        tipo_sanguineo: sessionStorage.getItem('tipo') || '' })
    
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
    const [errorTipo, setErrorTipo] = useState("")
    // const [errorLocal, setErrorLocal] = useState("")
    // const [errorCidade, setErrorCidade] = useState("")
    // const [errorNomeMinistrante, setErrorNomeMinistrante] = useState("")
    // const [errorQnt_Vagas, setErrorQnt_Vagas] = useState("")
    // const [errorData_inicio, setErrorData_inicio] = useState("")
    // const [errorData_encerramento, setErrorData_encerramento] = useState("")
    
    const hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
      };


    const handleConfirm = async () => {

        !data.nome? setErrorNome("Você não informou o seu nome!") : setErrorNome("") 
        !data.email? setErrorEmail("Você não informou o email!") : setErrorEmail("")
        !senha? setErrorSenha("Você não informou a senha!") : setErrorSenha("")
        !data.tipo_sanguineo? setErrorTipo("Você não preencheu esse campo!") : setErrorTipo("")
        !repetirSenha? setErrorRepetirSenha("Você não preencheu esse campo!") : setErrorRepetirSenha("")

        if (
            !errorNome &&
            !errorEmail &&
            !errorSenha &&
            !errorTipo &&
            !errorRepetirSenha
          ) {
            console.log('Passou')
            console.log('errorNome:', errorNome)
            console.log('errorEmail:', errorEmail)
            console.log('errorSenha:', errorSenha)
            console.log('errorTipo:', errorTipo)
            console.log('errorRepetirSenha:', errorRepetirSenha)
            const hashedPassword = await hashPassword(senha);
            setData({...data, senha_cripto: hashedPassword})
            handleSubmit()            
          } else{
            console.log('Erro')
          }
    }

    const handleSubmit = () =>{
        console.log(data)
    }



    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleNome = (e) =>{
        const nomeCompleto = e.target.value;
        setData({...data, nome: nomeCompleto})
        sessionStorage.setItem("nome", nomeCompleto)
    }

    
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
        setSenha(senha_)

    }

    const handleGenero = (e) =>{
        console.log(e.target.value)
        const genero_ = e.target.value;
        setData({...data, genero: genero_})
        sessionStorage.setItem("genero", genero_)
    }

    const handleTelefone = (e) =>{
        const telefone_ = e.target.value;
        setData({...data, telefone: telefone_})
        sessionStorage.setItem("telefone", telefone_)
    }
    
    const handleTipoSanguineo = (e) => {
        const tipoSanguineo = e.target.value;
        setData({...data, tipo_sanguineo: tipoSanguineo})
        sessionStorage.setItem("tipo", tipoSanguineo)
    }

    const handleRepetirSenha = (e) => {
        setRepetirSenha(e.target.value)
        if(e.target.value !== data.senha_cripto){
            setErrorRepetirSenha('Senhas diferentes')
        }else{
            setErrorRepetirSenha('')
        }
    }


    return(
        <ThemeProvider theme={theme}>
            <Container>
            <h1>Cadastro</h1>
            <Grid container spacing={2} >
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
s                    />
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
                <Grid item xs={12} md={12}>
                <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={data.genero}
                onChange={handleGenero}
                name="radio-buttons-group"
                >
                    <div style={{display: 'flex'}}>
                        <FormControlLabel value="f" control={<Radio />} label="Feminino" />
                        <FormControlLabel value="m" control={<Radio />} label="Masculino" />
                    </div>
                </RadioGroup>
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
                <Grid item xs={6} md={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" sx={{background: 'white', pr:1}}>Tipo Sanguíneo</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.tipo_sanguineo}
                    helperText={errorTipo? errorTipo: false}
                    error={errorTipo? true: false}
                    onChange={handleTipoSanguineo}
                    >
                    {options.tipos_sanguineos.map((item,i) =>(
                        <MenuItem key={i} value={item}>{item}</MenuItem>
                    ))}
                    </Select>
                    {errorTipo && <FormHelperText error>{errorTipo}</FormHelperText>}
                </FormControl>
                </Grid>
            </Grid>
            <Button variant="contained" className='button' onClick={handleConfirm} >Cadastrar</Button>
        </Container>    
        </ThemeProvider>
        
    )
}

export default FormCadastro

// sx={{border: '1px solid red'}}