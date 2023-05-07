import React, { useState } from 'react'
import {Modal,  }from '@mui/material';
import { ContentModal } from './styles';
import InputMask from "react-input-mask";
import { LocalDate } from 'js-joda';
import { parse, setHours, startOfDay } from "date-fns";
import {
    TextField, 
    Grid,
    Button,

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
        nome_campanha: sessionStorage.getItem('nome_campanha') || '',
        premio: sessionStorage.getItem('premio') || ''
    })
    
    const maxLength = 200; // limite de 50 caracteres

    const remainingCharsPremio = maxLength - data.premio.length; // caracteres restantes  
    const remainingCharsDesc = maxLength - data.descricao.length; // caracteres restantes  

    const [errorGanhadores, setErrorGanhadores] = useState("")
    const [errorNomeCampanha, setErrorNomeCampanha] = useState("")
    const [errorDescricao, setErrorDescricao] = useState("")
    const [errorDataInicio, setErrorDataInicio] = useState("")
    const [errorDataFim, setErrorDataFim] = useState("")
    const [errorPremio, setErrorPremio] = useState("")

    const [openSuccess, setOpenSuccess] = useState(false);

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

        if(!data.premio){
            setErrorPremio("Preencha esse campo!")
            isValid = false
        }else{
            setErrorPremio("")
        }
        
        const today = setHours(startOfDay(new Date()), 0);

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
        console.log(isValid)
        handleSubmit(isValid)
    }

    const handleSubmit = async (isValid) =>{
        if(isValid){
            var date_list1 = data.data_inicio.split("-")
            var date_list2 = data.data_fim.split("-")
            console.log(date_list1)
            const startDateOnly = LocalDate.of(date_list1[0], date_list1[1], date_list1[2]);
            const endDateOnly = LocalDate.of(date_list2[0], date_list2[1], date_list2[2]);
            console.log(startDateOnly)
            
            //const endDateOnly = LocalDate.of(data.data_fim.getFullYear(), data.data_fim.getMonth() + 1, data.data_fim.getDate());

            const formData = {
                name: data.nome_campanha,
                donation_place: profile.name,
                numberWinners: data.numero_ganhadores,
                description: data.descricao,
                startDate: startDateOnly,
                endDate: endDateOnly,
                idAdmin: profile.admin.id,
                premio: data.premio
            }

              try {
                console.log(formData)

                const response = await api.post('/campaign', formData);

                sessionStorage.removeItem('nome_campanha')
                sessionStorage.removeItem('numero_ganhadores')
                sessionStorage.removeItem('descricao')
                sessionStorage.removeItem('data_inicio')
                sessionStorage.removeItem('data_fim')
                sessionStorage.removeItem('premio')
                console.log('oi meu chapa')
                setOpenSuccess(true)
               
              } catch (error) {
                
                console.log(error);
              }
        }
    }

    const handleGanhadores = (e) =>{
        const ganhadores = e.target.value;
        setData({...data, numero_ganhadores: ganhadores})
        sessionStorage.setItem("numero_ganhadores", ganhadores)
    }
    const handleDataInicio = (e) =>{
        data.data_fim = '';
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
    const handlePremio = (e) =>{
        const premio = e.target.value
        setData({...data, premio: premio})
        sessionStorage.setItem("premio", premio)
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
                        label="Título da Campanha"
                        name="Título da Campanha"
                        required
                        fullWidth
                        error={errorNomeCampanha? true: false}
                        value={data.nome_campanha}
                        onChange={handleNomeCampanha}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <label>
                            Data de início da campanha:&nbsp;&nbsp;
                        </label>
                        <input type ="date"
                            
                            label='teste'
                            value={data.data_inicio}
                            error={errorDataInicio? true: false}
                            helperTexzt={errorDataInicio? errorDataInicio: false}
                            onChange={handleDataInicio}
                            style={{height: "55px", width:"100%", textAlign: "center", fontSize:"1em"}}></input>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <label>
                            Prazo final da camapanha:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </label>
                        <input type ="date"
                            fullWidth
                            label='teste'
                            min={data.data_inicio}
                            value={data.data_fim}
                            error={errorDataFim? true: false}
                            helperText={errorDataFim? errorDataFim: false}
                            onChange={handleDataFim}
                            style={{height: "55px", width:"100%", textAlign: "center", fontSize:"1em"}}></input>
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <TextField
                        label="Prêmio da Campanha"
                        name="Premio"
                        required
                        fullWidth
                        error={errorPremio? true: false}
                        value={data.premio}
                        onChange={handlePremio}
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
                        <p>Caracteres restantes: {remainingCharsDesc}/200</p>
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