import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {Container} from './styles'
import Header from '../../components/Header'
import api from '../../services/api';

import {
    Snackbar,
    Alert 
 } from '@mui/material';

function Cadastro (){
    const navigate = useNavigate()
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const email = params.get('email');
        const codigo = params.get('codigo');
    
        if (email && codigo) {
          confirmarEmail(email, codigo);
        }
        }, []);
        
    const confirmarEmail = async (email, codigo) => {
        try {
            const response = await api.post(`/confirm-email?email=${email}&codigo=${codigo}`);
            console.log(response.data);
            setOpenSuccess(true);
            setMessage(response.data.message)
        } catch (error) {
            setOpenError(true);
            setMessage(error.response.data.error)
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        if (openSuccess) {
          navigate("/login");
        }
        
        navigate("/")
      };

    return (
        <div>
            <Header/>
            <Container>
                <Snackbar
                    open={openSuccess}
                    autoHideDuration={1000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openError}
                    autoHideDuration={1000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="error">
                        {message}
                    </Alert>
                </Snackbar>
            </Container>
        </div>
      );
}

export default Cadastro