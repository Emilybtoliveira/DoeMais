import React, { useState,useRef, useEffect  } from 'react'
import {Modal,  }from '@mui/material';
import { ContentModal } from '../Feed/AddSolicitacoes/styles';
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
import * as options from '../../utils/options'
import UploadIcon from '@mui/icons-material/Upload';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components'
import api from '../../services/api'
import {useSelector} from 'react-redux'
import logo from '../../assets/logo.svg'
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
            <ContentModal style={{maxWidth:"500px"}}>
                <img src={logo} alt="logo" style={{marginBottom: '2%'}} />
                <div style={{display: "flex", justifyContent: 'center', alignItems:'center', flexDirection:'column'}} >                   
                    <h2 style={{marginBottom: '2%',  textAlign:'center'}} >Sua solicitação foi editada. </h2>
                    <p style={{marginBottom: '2%',fontSize: '11px', textAlign: 'center'}} >Sua solicitação  será divulgada por<strong style={{color: '#CE0C0C'}}> 90 dias </strong> a partir da data que você postou. Após esse período, ela será automaticamente removida. Caso o receptor não necessite mais de doações, por favor, lembre-se de <strong style={{color: '#CE0C0C'}}>apagar a solicitação</strong> para evitar confusões e garantir que os doadores possam ajudar outras pessoas que necessitam de doações de sangue.</p>
                    <div style={{display: "flex", justifyContent: 'flex-end'}}>
                                    <Button onClick={props.handleCloseSuccess}  variant="contained" >Ok!</Button>
                    </div>
                </div>
            </ContentModal>
        </Modal>
    )
}


export default function Solicitacoes (props) {

    // const {open, handleClose} = props;
    const id_user = useSelector(state => state.user.id_user);
    // const solic_update = useSelector(state => state.user.solic_update);
    const [data, setData] = useState({})
    const maxLength = 200; 
    const StyledButton = styled(Button)({
        width: '100%',
        color: '#000',
        '&:hover': {
          backgroundColor: '#2c3e50',
        },
      });
    const inputRef = useRef(null);

    const [openSuccess, setOpenSuccess] = useState(false);
    
    const [cidades, setCidades] = useState([]);


    const buscarCidades = async (query) => {
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${data.state.numero}/distritos
        `;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        setCidades(dados);
      };


    const solicitacaoUpdate = async () => {
        try{
            const response = await api.get(`solicitations?id=${props.id_solic}`);
            //   const response = await api.get(`solicitations?${id_user}`);
            return response.data.data.person;
            //   return response.data.data; 
        } catch (err) {
          console.error(err);
          return [];
        }
      };
    
    useEffect(() => {
        if (props.open) {
            solicitacaoUpdate()
            .then((data) => 
                setData(data)
                // // data.map(d => d.id === props.id_solic? setData(d): '')
                // data.map(d => d.id === props.id_solic? setData(d): '')
        ).catch((err) => console.error(err));}
    }, [props.open]);

    const [errorNome, setErrorNome] = useState("")
    const [errorIdade, setErrorIdade] = useState("")
    const [errorCidade, setErrorCidade] = useState("")
    const [errorEstado, setErrorEstado] = useState("")
    const [errorTipo, setErrorTipo] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleNome = (e) =>{
        const nomeCompleto = e.target.value;
        setData({...data, name: nomeCompleto})
    }
    const handleHospital = (e) =>{
        const hospital = e.target.value;
        setData({...data, hospital: hospital})
    }
    const handleIdade = (e) =>{
        const idade = e.target.value;
        setData({...data, age: idade})
    }
   
    const handleEstado = (e) =>{
        const estado = e.target.value;
        setData({...data, state: estado})
    }
    const handleTipo = (e) =>{
        const tipo_sanguineo = e.target.value;
        setData({...data, bloodtype: tipo_sanguineo})
    }
    const handleDescricao = (e) =>{
        const descricao = e.target.value;
        setData({...data, description: descricao})
    }
    const handleFoto= (e) =>{
        const file = e.target.files;
        if (file[0].size <= 10000000) {
            setData({...data, picture: file})
        } else {
            alert('O tamanho máximo permitido é de 10MB.');
        }            
    }
   
    const handleValidar =  () => {
        let isValid = true      
        
        if(!data.name){
            setErrorNome("Preencha esse campo!")
            isValid = false
        }else{  
            setErrorNome("")
        }

        if(!data.age){
            setErrorIdade("Preencha esse campo!")
            isValid = false
        }else if(data.idade < 0) {
            setErrorIdade("Você escolheu um número negativo")
            isValid = false
        }else{

            setErrorIdade("")
        }
        
        if(!data.state){
            setErrorEstado("Preencha esse campo!")
            isValid = false
        }else{
            setErrorEstado("")
        }

        if(!data.city){
            setErrorCidade("Preencha esse campo!")
            isValid = false
        }else{
            setErrorCidade("")
        }

        if(!data.bloodtype){
            setErrorTipo("Preencha esse campo!")
            isValid = false
        }else{
            setErrorTipo("")
        }
          handleSubmit(isValid)
    }

    
    const handleSubmit = async (isValid) =>{
        if(isValid){
            const formData = new FormData()

            let picture = data.picture && data.picture[0] ? data.picture[0] : null
            formData.append('picture', picture)
            formData.append('name', data.name)
            formData.append('bloodtype', data.bloodtype)
            formData.append('description', data.description)
            formData.append('city', data.city)
            formData.append('state', data.state.nome?data.state.nome:data.state )
            formData.append('hospital', data.hospital)
            formData.append('age', data.age)
            formData.append('id', props.id_solic)
            try {
                const response = await api.put('/solicitations', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setOpenSuccess(true)
            } catch (error) {
            console.log(error);
            // setErrorMessage(error.response.data.error)
            // setOpenFailure(true)
            setIsLoading(false)
            }
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
            <ContentModal>
            <h1>Editar Solicitação</h1>
            <h4 style={{marginBottom: '5%'}} >Informe somente os dados do receptor</h4>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        label="Nome Completo"
                        name="nome"
                        required
                        fullWidth
                        error={errorNome? true: false}
                        helperText={errorNome? errorNome: false}
                        value={data?.name}
                        onChange={handleNome}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        label="Hospital (Opcional)"
                        name="Hospital"
                        fullWidth
                        value={data?.hospital}
                        onChange={handleHospital}
                        />
                    </Grid>
                    
                    <Grid item xs={6} sm={6} md={6} lg={3}>
                            <TextField
                            label="Idade"
                            name="Idade"
                            required
                            type="number"
                            fullWidth
                            error={errorIdade? true: false}
                            helperText={errorIdade? errorIdade: false}
                            value={data?.age}
                            onChange={handleIdade}
                            />
                    </Grid>
                     <Grid item xs={6} sm={6} md={6} lg={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" required sx={{background: 'white', pr:1}}>Tipo Sanguíneo</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data?.bloodtype}
                            helperText={errorTipo? errorTipo: false}
                            error={errorTipo? true: false}
                            onChange={handleTipo}
                            >
                            {options.tipos_sanguineos_solicitacao.map((item,i) =>(
                                <MenuItem key={i} value={item}>{item}</MenuItem>
                            ))}
                            </Select>
                            {errorTipo && <FormHelperText error>{errorTipo}</FormHelperText>}
                    </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" required sx={{background: 'white', pr:1}}>Estado</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            value={data?.state}
                            helperText={errorEstado? errorEstado: false}
                            error={errorEstado? true: false}
                            onChange={handleEstado}
                            >
                            {options.estados.map((item,i) =>(
                                <MenuItem key={i} value={item}>{item.nome}</MenuItem>
                            ))}
                            </Select>
                            {errorTipo && <FormHelperText error>{errorTipo}</FormHelperText>}
                    </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={3}>
                    <Autocomplete
                        disabled={!data.state}
                        id="cidade"
                        options={cidades}
                        value={data?.city}
                        filterOptions={(options, { inputValue }) => {
                            return options.map((option) => option.nome).filter((name) =>
                            name.toLowerCase().includes(inputValue.toLowerCase())
                            );
                        }}
                        noOptionsText="Nenhuma cidade encontrada"
                        onChange={(event, newValue) => {
                            setData({...data, city: newValue})
                        }}
                        onInputChange={(event, newInputValue) => {
                            console.log(newInputValue)
                            buscarCidades(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} required helperText={errorCidade? errorCidade: false}
                        error={errorCidade? true: false} label="Cidade" variant="outlined" />
                        )}
                        />
                        
                    </Grid>
                   
                    <Grid item xs={12}>
                        <TextField
                        label="Descrição (Opcional)"
                        name="Descrição"
                        placeholder="Aqui você pode escrever mais informações sobre o seu pedido..."
                        multiline
                        rows={5}
                        fullWidth
                        value={data?.description}
                        onChange={handleDescricao}
                        inputProps={{
                            maxLength: maxLength
                          }}
                        />
                        <p>Caracteres restantes: {maxLength - data?.description?.length}/200</p>
                    </Grid>
                    <Grid item xs={12}>
                            <h3 style={{marginBottom: '2%'}} >Adicione uma foto do receptor (opcional):</h3>
                        <div style={{display: "flex", alignItems:'center'}}>
                            <StyledButton color='secondary' startIcon={data?.picture?<InsertPhotoIcon/>:<UploadIcon />} variant={data?.picture?"outlined": "contained"} onClick={() => inputRef.current.click()}>
                            {data?.picture?   data?.picture[0].name : "Upload da foto (Máx: 10MB)"}
                            </StyledButton>
                            <input
                                type="file"
                                ref={inputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                maxSize={50000000}
                                onChange={handleFoto}
                                
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                            <div style={{display: "flex", justifyContent: 'flex-end', marginTop: ''}}>
                                <Button onClick={handleValidar}  variant="contained" >Editar</Button>
                            </div>
                    </Grid>
                </Grid>
                </ContentModal>
         </Modal>
        <ModalSucesso open={openSuccess} handleCloseSuccess={() => window.location.reload()}/>
        </ThemeProvider>
    ) }


