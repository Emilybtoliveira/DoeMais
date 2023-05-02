        import React , {useRef, useState, useCallback} from  'react'
        // import { toJpeg } from 'html-to-image';
        import {toPng} from 'html-to-image';
        import { saveAs } from 'file-saver';    

        import { Container,Content } from './styles'
        import Card from '@mui/material/Card';
        import CardContent from '@mui/material/CardContent';
        import CardMedia from '@mui/material/CardMedia';    
        import Fab from '@mui/material/Fab';

        import DownloadIcon from '@mui/icons-material/Download';
        import WhatsAppIcon from '@mui/icons-material/WhatsApp';
        import Tooltip from '@mui/material/Tooltip';

        import img from '../../assets/Portal/CardsEstatico/img1.svg'
        import logo from '../../assets/logo.svg'
        import wallpaperDoeMais from  '../../assets/wallpaperDoeMais.svg'
        import hospital from '../../assets/Portal/CardsEstatico/hospital.svg';
        import local from '../../assets/Portal/CardsEstatico/local.svg'
        import { createTheme, ThemeProvider } from '@mui/material/styles';
        import api from '../../services/api'

        const theme = createTheme({
        
        palette: {
            primary: {
            main: 'rgba(197, 23, 23, 0.81)',
            darker: '#053e85',
            },
            
        
        },
        });


export default function PosterSolicitacao () {

    const handleBaixar = () => {
        const node = document.getElementById('part-to-download');
        toPng(node)
            .then((dataUrl) => {
            saveAs(dataUrl, 'solicitacao-sanguinea.png');
            })
            .catch((err) => {
            console.log(err)
            })
    }
    

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <div className='paper' id='part-to-download'>
                <Content>       
                    <img src={logo} alt='logo' width='30%' />
                    <h2 className='titulo' >Solicita-se Doação Sanguínea</h2>
                        <CardMedia
                            sx={{ minHeight:150 ,height: 250, width: '70%' }}
                            image={wallpaperDoeMais}
                            title="Foto do solicitante"
                        />
                        <CardContent sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '90%', p: '3% 0'}}>
                            <h2>JOSÉ LIMA DA SILVA </h2>
                            <h3>64 anos</h3>
                            <p>Morbi id rhoncus velit, eu vulputate mauris. Morbi at dictum tellus, vitae viverra lectus. Sed sit amet tincidunt odio...</p>
                        </CardContent> 
                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%', p: '3% 0'}}  >
                            <div style={{width: '90%'}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img src={local} alt='local' />
                                    <h4 style={{marginLeft: '2%', width: '100%' }} >Maceió, Alagoas</h4>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img src={hospital} alt='hospital' />
                                    <h4 style={{marginLeft: '2%'}} >Hospital Santa Fé</h4>
                                </div>
                            </div>
                            <h2 className='tipo'>O-</h2>
                        </CardContent> 
                        <CardContent sx={{p: '0'}}  >
                            <h2 className='hash'>#AjudeQuemPrecisa</h2>
                        </CardContent> 
                </Content>
                <h3 className='acesse' >Mais solicitações de doação sanguínea? Acesse <span>https://pds-2022-2-04.edge.net.br/</span></h3>
                </div>
                <div className='botoes'>
                <Tooltip title="Baixar Solicitação" placement="right"  >
                    <Fab onClick={handleBaixar} color="primary" size="small" aria-label="DownloadIcon" sx={{m: '20px'}}>
                        <DownloadIcon />
                    </Fab>
                </Tooltip>
                <Tooltip title="Compartilhar no WhatsApp" placement="right" >
                    <Fab color="primary" size="small" aria-label="WhatsAppIcon" sx={{ml: '20px'}}>
                        <WhatsAppIcon />
                    </Fab>
                </Tooltip>
                </div>
            </Container>
        </ThemeProvider>
    )
}
