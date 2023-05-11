import React, { useState} from 'react'
import {Modal,  }from '@mui/material';
import { durationInMonths } from '@progress/kendo-date-math';
import { ContentModal } from './styles';
import {
    TextField, 
    Grid,
    Button,   
 } from '@mui/material';
import logo from '../../assets/logo.svg'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components'
import api from '../../services/api'
import {useSelector} from 'react-redux'

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
                    <h2 style={{marginBottom: '2%', textAlign:'center'}} >Parabéns! Sua doação sanguínea foi atualizada! </h2>
                    <p style={{marginBottom: '2%',fontSize: '11px', textAlign: 'center'}} >Mantenha seu registro sempre atualizado para assim saber quando estará disponível para doar novamente! Verifique os dados de cada registro e os altere caso ainda não estejam condizentes.<strong style={{color: '#CE0C0C'}}></strong></p>
                    <div style={{display: "flex", justifyContent: 'flex-end'}}>
                                    <Button onClick={props.handleCloseSuccess}  variant="contained" >Ok!</Button>
                    </div>
                </div>
            </ContentModal>
        </Modal>
    )
}
const ModalFracasso = (props) =>{
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
                    <h2 style={{marginBottom: '2%',  textAlign:'center'}} >Não conseguimos atualizar sua doação! </h2>
                    <p style={{marginBottom: '2%',fontSize: '11px', textAlign: 'center'}} >Lembre-se que para atualizar uma doação a nova data deve obedecer ao tempo mínimo de meses entre doações. Edite outras doações ou confira a data da doação que está tentando atualizar e tente novamente!<strong style={{color: '#CE0C0C'}}></strong></p>
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
    var check = true;
    const gender = useSelector(state => state.user.gender);
    const profile = useSelector(state => state.user.profile)
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear()
    const today = `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
    const [data, setData] = useState({
        id:  props.idonation ||sessionStorage.getItem('id'),
        place: props.hospital || sessionStorage.getItem('hospital'),
        date: props.date ||sessionStorage.getItem('date')
    })
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const StyledButton = styled(Button)({
        width: '100%',
        color: '#000',
        '&:hover': {
          backgroundColor: '#2c3e50',
        },
      });
    
    const [errorHospital, setErrorHospital] = useState("")
    const [errorDate, setErrorDate] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const gap_month = 3;
    if (gender == 'Masculino'){
      gap_month = 2;
    }
    const [minhas_doacoes, setMinhas_doacoes] = useState([])

    React.useEffect(() => {
      const response = api.get(`/donation-register?idDonator=${profile.donator.id}`).then((response) => {
        console.log(response);
        setMinhas_doacoes(response.data)
      }).catch((error) => {
        console.log(error)
      })
    }, []);

    

    const calculateDate = (donation_date, donation_id) =>{
        var date_list = data.date.split("-")
        var date_list2 = donation_date.split("-")

        const start = new Date(date_list[0], date_list[1], date_list[2]);
        const end = new Date (date_list2[0], date_list2[1], date_list2[2]);
        const duration = Math.abs(durationInMonths(end, start));
        console.log(data.id, donation_id)
        if((duration < gap_month && check) && (data.id != donation_id)){
          check = false;
  
        }
        
      }
      const handleDonationGap = () =>{
        {minhas_doacoes.map(donation => {{calculateDate(donation.date, donation.id); console.log(check)}})}
  
      }

    const handleValidar =  () => {
        let isValid = true      
        if(!data.place){
            setErrorHospital("Preencha esse campo!")
            isValid = false
        }else{
            setErrorHospital("")
        }
        handleDonationGap()
        handleSubmit(isValid)
    }
    
    const handleSubmit = async (isValid) =>{
        if(isValid && check){
            // console.log(data)
            // setIsLoading(true);

            const formData = {
                place: data.place,
                date: data.date,
                id: props.idonation
              };
              try {
                const response = await api.put(`/donation-register`, formData);
                sessionStorage.removeItem('place')
                sessionStorage.removeItem('date')
                console.log("Sucesso")
                setOpenSuccess(true)
                check = true;
              
                // setOpenSuccess(true)
                // setTimeout(() => {
                //     setIsLoading(false);
                //     navigate("/login");
                //   }, 2000);
              } catch (error) {
                console.log(error);
                // setErrorMessage(error.response.data.error)
                // setOpenFailure(true)
                setIsLoading(false)
                check = true;
              }
        }
        else if(!(check))
        {
          setOpenFailure(true)
          check=true;
        }
    }

    const handleHospital = (e) =>{
        const hospital = e.target.value;
        setData({...data, place: hospital})
        sessionStorage.setItem("hospital", hospital)
    }
    const handleDate = (e) =>{
      const date = e.target.value;
      setData({...data, date: date})
      sessionStorage.setItem("date", date)
      console.log(date)
  }
  ;
  


    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                

            >
            <ContentModal>
            <h1>Editar doação</h1>
            <h4 style={{marginBottom: '5%'}} >Recadastre a doação com os dados corretos!</h4>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    <input type ="date"
                      fullWidth
                      
                      value={data.date}
                      min="1920-01-01"
                      max={today}
                      error={errorDate? true: false}
                      helperText={errorDate? errorDate: false}
                      onChange={handleDate}
                    style={{height: "55px", width:"100%", textAlign: "center", fontSize:"1em"}}></input>
                        
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        label="Local de doação"
                        name="Hospital"
                        fullWidth
                        value={data.place}
                        required
                        error={errorHospital? true: false}
                        helperText={errorHospital? errorHospital: false}
                        onChange={handleHospital}
                        />
                    </Grid>
                
                    <Grid item xs={12}>
                            <div style={{display: "flex", justifyContent: 'center'}}>
                                <Button onClick={handleValidar}  variant="contained" style={{height: "55px",  width:"150px"}}>Registrar</Button>
                            </div>
                    </Grid>
                    
                
                </Grid>
                </ContentModal>
         </Modal>
         <ModalSucesso open={openSuccess} handleCloseSuccess={() => window.location.reload()}/>
         <ModalFracasso open={openFailure} handleCloseSuccess={() => setOpenFailure(false)}/>
        
        </ThemeProvider>
    )
       
}
