import api from '../../../services/api';
import { useState } from 'react';
import { Container } from './styles'
import Button from '@mui/material/Button';

import {
  Grid,
}from '@mui/material';

export default function CriarQRCodeDoacao () {
  const [qrCode, setQRCode] = useState(null)

  const createQrCode = async () => {
      try {
          const formData = {
              date: "2023-04-27",
              place: "HU"
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={qrCode} alt='QRCode'/>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={createQrCode}  variant="contained">Criar QRCode</Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}


