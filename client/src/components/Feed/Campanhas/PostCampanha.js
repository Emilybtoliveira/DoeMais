import React, { useState } from 'react'
import {Modal,  }from '@mui/material';
import { ContentModal } from './styles';
import InputMask from "react-input-mask";
import { LocalDate } from 'js-joda';
import { parse } from "date-fns";
import {
    TextField, 
    Grid,
    Autocomplete,
    FormControlLabel,
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
import * as options from '../../../utils/options'
import UploadIcon from '@mui/icons-material/Upload';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components'
import api from '../../../services/api'
import {useSelector} from 'react-redux'
import logo from '../../../assets/logo.svg'
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
                    <h2 style={{marginBottom: '2%'}} >Parabéns! Sua campanha de doação sanguínea foi postada. </h2>
                    <div style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Button onClick={props.handleCloseSuccess}  variant="contained" >Ok!</Button>
                    </div>
                </div>
            </ContentModal>
        </Modal>
    )
}


export default function Campanhas (props) {
    const {open, handleClose} = props;
    const profile = useSelector(state => state.user.profile);
    const [data, setData] = useState({
        numero_ganhadores: sessionStorage.getItem('numero_ganhadores') || 1, 
        descricao: sessionStorage.getItem('descricao') || '', 
        data_inicio: sessionStorage.getItem('data_inicio') || '',
        data_fim: sessionStorage.getItem('data_fim') || '',
        nome_campanha: sessionStorage.getItem('nome_campanha') || ''
    })
    const [openSuccess, setOpenSuccess] = useState(false);
    
    const maxLength = 200; // limite de 50 caracteres
    const remainingChars = maxLength - data.descricao.length; // caracteres restantes  

    const [errorGanhadores, setErrorGanhadores] = useState("")
    const [errorNomeCampanha, setErrorNomeCampanha] = useState("")
    const [errorDescricao, setErrorDescricao] = useState("")
    const [errorDataInicio, setErrorDataInicio] = useState("")
    const [errorDataFim, setErrorDataFim] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleValidar =  () => {
        let isValid = true

        if (!data.nome_campanha){
            setErrorNomeCampanha("Preencha esse campo!")
            isValid = false
        } else {
            setErrorNomeCampanha("")
        }

        if(!data.numero_ganhadores){
            setErrorGanhadores("Preencha esse campo!")
            isValid = false
        }else{
            if (data.numero_ganhadores <= 0) {
                setErrorGanhadores("O numero de ganhadores tem que ser maior que zero")
                isValid = false
            } else {
                setErrorGanhadores("")
            }
        }

        if(!data.descricao){
            setErrorDescricao("Preencha esse campo!")
            isValid = false
        }else{
            setErrorDescricao("")
        }
        
        const today = new Date();

        if(!data.data_inicio){
            setErrorDataInicio("Preencha esse campo!")
            isValid = false
        }else{
            const parsedInitialDate = parse(data.data_inicio, "dd/MM/yyyy", new Date());
            if (parsedInitialDate < today){
                setErrorDataInicio("Coloque uma data maior do que hoje")
                isValid = false
            } else {
                setErrorDataInicio("")
            }
        }

        if(!data.data_fim){
            setErrorDataFim("Preencha esse campo!")
            isValid = false
        }else{
            if (data.data_inicio) {
                const parsedInitialDate = parse(data.data_inicio, "dd/MM/yyyy", new Date());
                const parsedEndDate = parse(data.data_fim, "dd/MM/yyyy", new Date());

                if (parsedInitialDate > parsedEndDate){
                    setErrorDataFim("Coloque uma data final maior do que a inicial")
                    isValid = false
                } else {
                    setErrorDataFim("")
                }
            }
        }
        handleSubmit(isValid)
    }

    const handleSubmit = async (isValid) =>{
        if(isValid){
            setIsLoading(true);

            const startDate = parse(data.data_inicio, "dd/MM/yyyy", new Date())
            const endDate = parse(data.data_fim, "dd/MM/yyyy", new Date())

            const startDateOnly = LocalDate.of(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
            const endDateOnly = LocalDate.of(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());

            const formData = {
                name: data.nome_campanha,
                numberWinners: data.numero_ganhadores,
                description: data.descricao,
                startDate: startDateOnly,
                endDate: endDateOnly,
                idAdmin: profile.admin.id
            }

              try {
                console.log(formData)

                const response = await api.post('/campaign', formData);

                sessionStorage.removeItem('nome_campanha')
                sessionStorage.removeItem('numero_ganhadores')
                sessionStorage.removeItem('descricao')
                sessionStorage.removeItem('data_inicio')
                sessionStorage.removeItem('data_fim')

                setOpenSuccess(true)
               
              } catch (error) {
                console.log(error);
                // setErrorMessage(error.response.data.error)
                // setOpenFailure(true)
                setIsLoading(false)
              }
        }
    }

    const handleGanhadores = (e) =>{
        const ganhadores = e.target.value;
        setData({...data, numero_ganhadores: ganhadores})
        sessionStorage.setItem("numero_ganhadores", ganhadores)
    }
    const handleDataInicio = (e) =>{
        const dataInicio = e.target.value;
        setData({...data, data_inicio: dataInicio})
        sessionStorage.setItem("data_inicio", dataInicio)
    }
    const handleDataFim = (e) =>{
        const dataFim = e.target.value;
        setData({...data, data_fim: dataFim})
        sessionStorage.setItem("data_fim", dataFim)
    }
    const handleDescricao = (e) =>{
        const descricao = e.target.value;
        setData({...data, descricao: descricao})
        sessionStorage.setItem("descricao", descricao)
    }

    const handleNomeCampanha = (e) =>{
        const nome_campanha = e.target.value
        setData({...data, nome_campanha: nome_campanha})
        sessionStorage.setItem("nome_campanha", nome_campanha)
    }

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
            <ContentModal>
            <h1>Publicar Campanha</h1>
            <h4 style={{marginBottom: '5%'}} >Informe os dados sobre a campanha</h4>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        label="Nome da Campanha"
                        name="Nome da Campanha"
                        required
                        fullWidth
                        error={errorNomeCampanha? true: false}
                        value={data.nome_campanha}
                        onChange={handleNomeCampanha}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <label htmlFor="data">Data de inicio:</label>
                        <InputMask
                            mask="99/99/9999" // define a máscara para dd/mm/yyyy
                            value={data.data_inicio}
                            onChange={handleDataInicio}
                            name="Data de inicio"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <label htmlFor="data">Data de fim:</label>
                        <InputMask
                            mask="99/99/9999" // define a máscara para dd/mm/yyyy
                            value={data.data_fim}
                            onChange={handleDataFim}
                            name="Data de fim"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Numero de ganhadores"
                            name="Numero de ganhadores"
                            required
                            type="number"
                            fullWidth
                            error={errorGanhadores? true: false}
                            helperText={errorGanhadores? errorGanhadores: false}
                            value={data.numero_ganhadores}
                            onChange={handleGanhadores}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        label="Descrição"
                        name="Descrição"
                        required
                        placeholder="Aqui você pode escrever mais informações sobre o seu pedido..."
                        multiline
                        rows={5}
                        fullWidth
                        value={data.descricao}
                        onChange={handleDescricao}
                        inputProps={{
                            maxLength: maxLength
                          }}
                        />
                        <p>Caracteres restantes: {remainingChars}/200</p>
                    </Grid>
                    <Grid item xs={12}>
                            <div style={{display: "flex", justifyContent: 'flex-end', marginTop: ''}}>
                                <Button onClick={handleValidar}  variant="contained" >Publicar</Button>
                            </div>
                    </Grid>
                </Grid>
                </ContentModal>
         </Modal>
        <ModalSucesso open={openSuccess} handleCloseSuccess={() => window.location.reload()}/>
        </ThemeProvider>
    )
       
}