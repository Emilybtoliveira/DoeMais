import api from '../../../services/api';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { Container } from './styles'
import Button from '@mui/material/Button';

import {
  Grid,
}from '@mui/material';

export default function CriarQRCodeDoacao () {
  const [qrCode, setQRCode] = useState(null)
  const profile = useSelector(state => state.user.profile)

  const createQrCode = async () => {
    try {
        const formData = {
          place: profile.name
        }

        const response = await api.post('/create-donation-register-qrcode', formData);
        setQRCode(response.data)
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Container>
      <div>
        <h1>Criar QRCode</h1>
        <p>Nessa sessão você pode gerar QRCodes para validar doações de sangue feitas em sua instituição. Basta apenas que o doador tenha um cadastro na nossa plataforma e que você gere um QRCode abaixo.</p><br/>
        <p>Cada QRCode é de uso único, e ao scanear, basta apenas informar o e-mail da conta cadastrada do usuário em nossa plataforma que nós registraremos automaticamente a doação validada.</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={qrCode} alt='QRCode'/>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={createQrCode}  variant="contained" className='button'>Gerar QRCode</Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}