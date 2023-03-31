import React, { useState,useRef  } from 'react'
import {Modal,  }from '@mui/material';
import { ContentModal } from './styles';
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
                    <h2 style={{marginBottom: '2%'}} >Parabéns! Sua solicitação de doação sanguínea foi postada. </h2>
                    <p style={{marginBottom: '2%',fontSize: '11px', textAlign: 'center'}} >Sua solicitação  será divulgada por<strong style={{color: '#CE0C0C'}}> 90 dias </strong> a partir de hoje. Após esse período, ela será automaticamente removida. Caso o receptor não necessite mais de doações, por favor, lembre-se de <strong style={{color: '#CE0C0C'}}>apagar a solicitação</strong> para evitar confusões e garantir que os doadores possam ajudar outras pessoas que necessitam de doações de sangue.</p>
                    <div style={{display: "flex", justifyContent: 'flex-end'}}>
                                    <Button onClick={props.handleCloseSuccess}  variant="contained" >Ok!</Button>
                    </div>
                </div>
            </ContentModal>
        </Modal>
    )
}


export default function Solicitacoes (props) {
    const {open, handleClose} = props;
    const id_user = useSelector(state => state.user.id_user);
    const [data, setData] = useState({
        nome: sessionStorage.getItem('nomeSolic') || '', 
        hospital:sessionStorage.getItem('hospital') || '', 
        idade: sessionStorage.getItem('idade')|| null, 
        cidade: sessionStorage.getItem('cidade') || '', 
        estado: sessionStorage.getItem('estado') || '', 
        tipo_sanguineo: sessionStorage.getItem('tipoSolic') || '' ,
        descricao: sessionStorage.getItem('descricao') || '', 
        foto_receptor: sessionStorage.getItem('foto_receptor') || null, 
    })
    const [openSuccess, setOpenSuccess] = useState(false);
    
    const maxLength = 200; // limite de 50 caracteres
    const remainingChars = maxLength - data.descricao.length; // caracteres restantes 

    const StyledButton = styled(Button)({
        width: '100%',
        color: '#000',
        '&:hover': {
          backgroundColor: '#2c3e50',
        },
      });
    const inputRef = useRef(null);

    const [cidade, setCidade] = useState(null);
    const [cidades, setCidades] = useState([]);

    const buscarCidades = async (query) => {
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${data?.estado.numero}/distritos
        `;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        setCidades(dados);
      };

    const [errorNome, setErrorNome] = useState("")
    const [errorIdade, setErrorIdade] = useState("")
    const [errorCidade, setErrorCidade] = useState("")
    const [errorEstado, setErrorEstado] = useState("")
    const [errorTipo, setErrorTipo] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleValidar =  () => {
        let isValid = true      

        if(!data.nome){
            setErrorNome("Preencha esse campo!")
            isValid = false
        }else{
            setErrorNome("")
        }

        if(!data.idade){
            setErrorIdade("Preencha esse campo!")
            isValid = false
        }else{
            setErrorIdade("")
        }
        
        if(!data.estado){
            setErrorEstado("Preencha esse campo!")
            isValid = false
        }else{
            setErrorEstado("")
        }

        if(!data.cidade){
            setErrorCidade("Preencha esse campo!")
            isValid = false
        }else{
            setErrorCidade("")
        }

        if(!data.tipo_sanguineo){
            setErrorTipo("Preencha esse campo!")
            isValid = false
        }else{
            setErrorTipo("")
        }
          handleSubmit(isValid)
    }

    const handleSubmit = async (isValid) =>{
        if(isValid){
            // console.log(data)
            // setIsLoading(true);

            const formData = {
                name: data.nome,
                bloodtype: data.tipo_sanguineo, 
                description: data.descricao, 
                // city: data.cidade + ", " + data.estado.nome, 
                city: "Maceió", 
                hospital: data.hospital,
                // picture: data.foto_receptor,
                picture: "",
                userId: id_user
              };
              try {
                const response = await api.post(`/solicitations`, formData);
                
                sessionStorage.removeItem('nomeSolic')
                sessionStorage.removeItem('hospital')
                sessionStorage.removeItem('idade')
                sessionStorage.removeItem('cidade') 
                sessionStorage.removeItem('estado') 
                sessionStorage.removeItem('tipoSolic') 
                sessionStorage.removeItem('descricao') 
                sessionStorage.removeItem('foto_receptor') 

                setOpenSuccess(true)
               
              } catch (error) {
                console.log(error);
                // setErrorMessage(error.response.data.error)
                // setOpenFailure(true)
                setIsLoading(false)
              }
        }
    }



    const handleNome = (e) =>{
        const nomeCompleto = e.target.value;
        setData({...data, nome: nomeCompleto})
        sessionStorage.setItem("nomeSolic", nomeCompleto)
    }
    const handleHospital = (e) =>{
        const hospital = e.target.value;
        setData({...data, hospital: hospital})
        sessionStorage.setItem("hospital", hospital)
    }
    const handleIdade = (e) =>{
        const idade = e.target.value;
        setData({...data, idade: idade})
        sessionStorage.setItem("idade", idade)
    }
   
    const handleEstado = (e) =>{
        const estado = e.target.value;
        setData({...data, estado: estado})
        sessionStorage.setItem("estado", estado)
    }
    const handleTipo = (e) =>{
        const tipo_sanguineo = e.target.value;
        setData({...data, tipo_sanguineo: tipo_sanguineo})
        sessionStorage.setItem("tipoSolic", tipo_sanguineo)
    }
    const handleDescricao = (e) =>{
        const descricao = e.target.value;
        setData({...data, descricao: descricao})
        sessionStorage.setItem("descricao", descricao)
    }
    const handleFoto= (e) =>{
        const file = e.target.files;
        if (file[0].size <= 10000000) {
            setData({...data, foto_receptor: file})
        } else {
            alert('O tamanho máximo permitido é de 10MB.');
        }            
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
            <h1>Publicar Solicitação</h1>
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
                        value={data.nome}
                        onChange={handleNome}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        label="Hospital (Opcional)"
                        name="Hospital"
                        fullWidth
                        value={data.hospital}
                        onChange={handleHospital}
                        />
                    </Grid>
                    
                    <Grid item xs={3}>
                        <TextField
                        label="Idade"
                        name="Idade"
                        required
                        type="number"
                        fullWidth
                        error={errorIdade? true: false}
                        helperText={errorIdade? errorIdade: false}
                        value={data.idade}
                        onChange={handleIdade}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" required sx={{background: 'white', pr:1}}>Estado</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.estado}
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
                    <Grid item xs={3}>
                    <Autocomplete
                        disabled={!data.estado}
                        id="cidade"
                        options={cidades}
                        
                        filterOptions={(options, { inputValue }) => {
                            return options.map((option) => option.nome).filter((name) =>
                            name.toLowerCase().includes(inputValue.toLowerCase())
                            );
                        }}
                        noOptionsText="Nenhuma cidade encontrada"
                        onChange={(event, newValue) => {
                            setData({...data, cidade: newValue})
                            sessionStorage.setItem("cidade", cidade)
                        }}
                        onInputChange={(event, newInputValue) => {
                            buscarCidades(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} required helperText={errorCidade? errorCidade: false}
                        error={errorCidade? true: false} label="Cidade" variant="outlined" />
                        )}
                        />
                        
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" required sx={{background: 'white', pr:1}}>Tipo Sanguíneo</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.tipo_sanguineo}
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
                    <Grid item xs={12}>
                        <TextField
                        label="Descrição (Opcional)"
                        name="Descrição"
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
                            <h3 style={{marginBottom: '2%'}} >Adicione uma foto do receptor (opcional):</h3>
                        <div style={{display: "flex", alignItems:'center'}}>
                            <StyledButton color='secondary' startIcon={data.foto_receptor?<InsertPhotoIcon/>:<UploadIcon />} variant={data.foto_receptor?"outlined": "contained"} onClick={() => inputRef.current.click()}>
                            {data.foto_receptor?   data.foto_receptor[0].name : "Upload da foto (Máx: 10MB)"}
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


