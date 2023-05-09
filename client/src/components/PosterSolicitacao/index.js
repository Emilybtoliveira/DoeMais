        import React , {useEffect, useState} from  'react'
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
        import {useSelector} from 'react-redux'

        const theme = createTheme({
        
        palette: {
            primary: {
            main: 'rgba(197, 23, 23, 0.81)',
            darker: '#053e85',
            },
        },
        });


export default function PosterSolicitacao () {

    const id_share = useSelector(state => state.user.share_id)
    const [solicitacao, setSolicitacao] = useState({})

    const url = window.location.pathname
    const id = url.split("/").pop();

    
    useEffect(() => {
        const loadSolicitacao = async () => {
          const { data } = await api.get(`solicitations?id=${id}`);
          setSolicitacao(data.data);
        };
        
        loadSolicitacao();
      }, []);
    
    console.log(solicitacao)
    const messageWhats =  solicitacao && `*Atenção! A equipe DoeMais tem um pedido*🩸🏥 %0A%0A*${solicitacao?.person?.name}* está precisando de Doação de Sangue.🧑‍🤝‍🧑🔴%0A 
    %0ANeste momento, precisamos da sua contribuição para ajudar aqueles que precisam. Sua doação pode salvar vidas.
    %0A%0APara saber mais informações e ajudar a espalhar esta mensagem, por favor, compartilhe este link: http://localhost:3000/compartilhar-solicitacao/${id_share}
    %0A%0A*#DoeSangueSalveVidas* ❤️
    `

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
                            image={solicitacao?.person?.picture? "http://localhost:5000/files/solicitations/" + solicitacao.person.picture : wallpaperDoeMais}
                            title="Foto do solicitante"
                        />
                        <CardContent sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '90%', p: '3% 0'}}>
                            <h2>{ solicitacao?.person?.name? solicitacao.person.name: 'Teste'} </h2>
                            <h3>{ solicitacao?.person?.age?solicitacao.person.age: "64"} anos</h3>
                            <p>{ solicitacao?.person?.description? solicitacao.person.description : "#DoeMais"}</p>
                        </CardContent> 
                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%', p: '3% 0'}}  >
                            <div style={{width: '90%'}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img src={local} alt='local' />
                                    <h4 style={{marginLeft: '2%', width: '100%' }} >{ solicitacao?.person?.city?solicitacao.person.city: "Maceió"}, {solicitacao?.person?.state ? solicitacao.person.state: 'Al'} </h4>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img src={hospital} alt='hospital' />
                                    <h4 style={{marginLeft: '2%'}} >{ solicitacao?.person?.hospital? solicitacao.person.hospital : "Hospital Santa Fé"}</h4>
                                </div>
                            </div>
                            <h2 className='tipo'>{ solicitacao?.person?.bloodtype?solicitacao.person.bloodtype: "O-"}</h2>
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
                    <a href={`https://web.whatsapp.com/send?text=${messageWhats}`} target="_blank" rel="noreferrer">
                        <Fab color="primary" size="small" aria-label="WhatsAppIcon" sx={{ml: '20px'}}>
                            <WhatsAppIcon />
                        </Fab>
                    </a>
                </Tooltip>
                </div>
            </Container>
        </ThemeProvider>
    )
}
