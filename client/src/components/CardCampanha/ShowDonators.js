import React from 'react'
import logo from '../../assets/logo.svg'
import {Modal, Button  }from '@mui/material';
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

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
            <ContentModal>
                <img src={logo} alt="logo" style={{marginBottom: '2%'}} />
                {users.length> 0 && name == "Doadores"?
                <div>
                  <h2 style={{marginBottom: '2%', textAlign:'center'}} >Até o momento esses são os doadores que se juntaram à sua campanha: </h2>
                  <Grid container spacing={ 2} rowSpacing={0} className='grid' direction="column" alignItems="center" justifyContent="center">
                      {users.reverse().map((item,i) =>(
                          <Grid item key={i}  xs={12} md={4}  xl={4} >
                              <h4>{i+1} - {item.name} : {item.donation}</h4>
                          </Grid>
                      ))}
                  </Grid>
                </div>: users.length>0 && name == 'Ganhadores'?
                <div>
                <h2 style={{marginBottom: '2%', textAlign:'center'}} >A campanha se encerrou, veja abaixo os vencedores:</h2>
                <Grid container spacing={ 2} rowSpacing={0} className='grid' direction="column" alignItems="center" justifyContent="center">
                    {users.reverse().map((item,i) =>(
                        <Grid item key={i}  xs={12} md={4}  xl={4}>
                            <h2>{i+1} - {item.name}</h2>
                            <h2>{item.donation}</h2>
                        </Grid>
                    ))}
                </Grid>
                <p style={{marginBottom: '2%', marginTop: '30px',fontSize: '11px', textAlign: 'center'}} > O sorteio foi feito automaticamente pela nossa plataforma e os vencedores já foram contactados via e-mail para receber sua premiação. Aos usuários premiados, confiram a caixa de entrada para checar as instruções de entrega do seu prêmio!</p>
              </div>: users.length < 0 && name == 'Ganhadores'?
              <div style={{display: "flex", justifyContent: 'center', alignItems:'center', flexDirection:'column'}} >
                  <h2 style={{marginBottom: '2%', textAlign:'center'}} >Parabéns! A campanha se encerrou.</h2>
                  <p style={{marginBottom: '2%',fontSize: '14px', textAlign: 'center'}} >Nossa equipe agradece a todos os contribuintes dessa causa solidária! Graças a vocês conseguimos gerar um impacto na vida de muitas pessoas!</p>
              </div>
                : name != 'Ganhadores'?
                  <div style={{display: "flex", justifyContent: 'center', alignItems:'center', flexDirection:'column'}} >
                      <h2 style={{marginBottom: '2%', textAlign:'center'}} >Doadores ainda não se juntaram à sua campanha</h2>
                      <p style={{marginBottom: '2%',fontSize: '14px', textAlign: 'center'}} >Sua campanha foi divulgada para os usuários de nossa plataforma e se encerrará precisamente no <strong style={{color: '#CE0C0C'}}>dia especificado</strong>. No dia de encerramento, em caso de uma campanha com prêmios, será feito automaticamente o sorteio. Caso deseje encerrar a campanha antes, basta clicar no <strong style={{color: '#CE0C0C'}}>ícone de X</strong> dentro do card.</p>
              
                  </div>: 
              <div style={{display: "flex", justifyContent: 'center', alignItems:'center', flexDirection:'column'}} >
                  <h2 style={{marginBottom: '2%', textAlign:'center'}}>A campanha se encerrou sem vencedores</h2>
                  <p style={{marginBottom: '2%',fontSize: '14px', textAlign: 'center'}} >Sua campanha foi divulgada para os usuários de nossa plataforma mas fechou antes que alguém se cadastrasse.</p>
          
                  </div>
                }
            </ContentModal>
         </Modal>
        </ThemeProvider>
    )
       
}