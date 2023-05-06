import React from 'react'
import {Modal,  }from '@mui/material';
import { ContentModal } from './styles';
import {
    Grid,
 } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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


export default function Campanhas (props) {
    const {open, handleClose, users, name} = props;

    console.log("users")
    console.log(users)

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
            <ContentModal>
                <h1>{name}</h1>
                <Grid container spacing={ 2} rowSpacing={0} className='grid'>
                    {users.reverse().map((item,i) =>(
                        <Grid item key={i}  xs={12} md={4}  xl={4} >
                            <h4>{item.name}</h4>
                            <h4>{item.donation}</h4>
                        </Grid>
                    ))}
                </Grid>
            </ContentModal>
         </Modal>
        </ThemeProvider>
    )
       
}