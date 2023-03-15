import React from 'react';
import {Container} from './styles'
import {TextField, Grid,RadioGroup,FormControlLabel,Radio,Button } from '@mui/material';
import * as palette from "../../utils/variablesColor"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
 
    palette: {
      primary: {
        main: 'rgba(197, 23, 23, 0.81)',
        darker: '#053e85',
      },
    
    },
  });
function FormCadastro (){
    return(
        <ThemeProvider theme={theme}>
            <Container>
            <h1>Cadastro</h1>
            <Grid container spacing={2} >
                <Grid item xs={12} md={12} >
                    <TextField 
                    color='primary'
                    label="Nome Completo"
                    name="nome"
                    required
                    fullWidth
                   
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField required fullWidth label="Email" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField required fullWidth label="Senha" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField required fullWidth label="Repetir senha" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={12}>
                <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                >
                    <div style={{display: 'flex'}}>
                        <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
                        <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                    </div>
                </RadioGroup>
                </Grid>
              
                <Grid item xs={6} md={6} >
                    <TextField fullWidth label="Telefone" variant="outlined" />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField fullWidth label="Tipo sanguíneo" variant="outlined" />
                </Grid>
            </Grid>
            <Button variant="contained" className='button' >Cadastrar</Button>
        </Container>    
        </ThemeProvider>
        
    )
}

export default FormCadastro

// sx={{border: '1px solid red'}}