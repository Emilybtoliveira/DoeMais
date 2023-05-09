import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logoutIcon from '../../assets/Feed/logoutIcon.png'
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { createTheme,ThemeProvider } from '@mui/material/styles';

import Solicitacoes from './Solicitacoes';
import AddSolicitacoes from './AddSolicitacoes';
import HistoricoDoacao from './HistoricoDoacao';
import LocalDoacao from './LocalDoacao';
import EditProfile from './EditProfile';
import Campanhas from './Campanhas'
import CreateQRCodeDoacao from './CreateQRCodeDoacao'

import logo from '../../assets/logo.svg'
import solicNoSelec from '../../assets/Feed/solicNoSelec.svg'
import solicSelec from '../../assets/Feed/solicSelec.svg'
import addSolicNoSelec from '../../assets/Feed/addSolicNoSelec.svg'
import addSolicSelec from '../../assets/Feed/addSolicSelec.svg'
import histNoSelect from '../../assets/Feed/histNoSelect.svg'
import histSelect from '../../assets/Feed/histSelect.svg'
import infoNoSelect from '../../assets/Feed/infoNoSelect.svg'
import infoSelect from '../../assets/Feed/infoSelect.svg'
import campaignNoSelect from '../../assets/Feed/campaignNoSelect.png'
import campaignSelect from '../../assets/Feed/campaignSelect.png'
import localNoSelect from '../../assets/Feed/localNoSelect.svg'
import localSelect from '../../assets/Feed/localSelect.svg'
import settingsNoSelect from '../../assets/Feed/settingsNoSelect.svg'
import settingsSelect from '../../assets/Feed/settingsSelect.svg'
import {useSelector, useDispatch} from 'react-redux'
import { logOut } from '../../store/actions/authActions';
import {useLocation,useNavigate} from 'react-router-dom'

import {
  Modal,
  Grid,
}from '@mui/material';

import UploadIcon from '@mui/icons-material/Upload';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { ContentModal } from './styles';
import styled from 'styled-components'
import api from '../../services/api'
import InfoSecao from '../InfoSecao';
import { border, borderColor } from '@mui/system';

const theme = createTheme({
    components: {
        MuiListItemButton: {
          styleOverrides: {
            root: {
              '&.Mui-selected': {
                backgroundColor: '#CC0000', 
                '&:hover': {
                    backgroundColor: 'rgba(204, 0, 0, 0.8)', 
                  },
              },
              
            },
          },
        },
      },
});

const drawerWidth = 280;

function Feed(props) {
  const profile = useSelector(state => state.user.profile)
  const { window } = props;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState({
    index:0,
    component: profile?.donator? <Solicitacoes/> : <CreateQRCodeDoacao/>
  }); // Novo estado
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleListItemClick = (event, component) => {
    setSelectedComponent({index: component.index, component: component.component}); 
    navigate('/dashboard')
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const LogOut = () => {
    dispatch(logOut())
    window.reload()
  }

  const StyledButton = styled(Button)({
    width: '100%',
    color: '#000',
    '&:hover': {
      backgroundColor: '#2c3e50',
    },
  });

  const [showModal, setShowModal] = React.useState(false)
  const inputRef = React.useRef(null);
  const [data, setData] = React.useState({
      foto_avatar: sessionStorage.getItem('foto_avatar') || null,
  })


  const handleModal = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false);
    setAnchorEl(null);

  }

  const handleFoto= (e) =>{
    const file = e.target.files;
    if (file[0].size <= 10000000) {
        setData({...data, foto_avatar: file})
    } else {
        alert('O tamanho máximo permitido é de 10MB.');
    }            
}

  const handleUploadPhoto = async () => {
    const formData = new FormData()
    formData.append('image', data.foto_avatar[0])

    try {
      const response = await api.post(`/upload-img/${profile?.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });

      sessionStorage.removeItem('image')
      setShowModal(false)
      navigate('/')
    } catch (error) {
      console.log(error);
    }

  }


  const Edit = () => {
    navigate('/editar-perfil')
    handleClose()
  }

  const location = useLocation();
  const url = location.pathname;
  const componentes = profile?.donator? [
    {nome: 'Solicitações', icone: solicNoSelec, iconeSelect: solicSelec, width:25 ,alt:'Solicitações de Doação', index:0 , component: <Solicitacoes/> },
    {nome: 'Solicitar doação', icone: addSolicNoSelec,iconeSelect: addSolicSelec, width:18 , alt:'Solicitar doação',index:1 , component: <AddSolicitacoes/> },
    {nome: 'Registro de doações', icone: histNoSelect, iconeSelect: histSelect,width: 20, alt:'Registro de doações',index:2 , component: <HistoricoDoacao/> },
    {nome: 'Locais de doação', icone: localNoSelect, iconeSelect: localSelect,width: 20, alt:'Locais',index:3 , component: <LocalDoacao/>},
    {nome: 'Campanhas', icone: campaignNoSelect, iconeSelect: campaignSelect, width:25 ,alt:'Campanhas', index:5 , component: <Campanhas/>},
    {nome: 'Saiba mais', icone: infoNoSelect, iconeSelect: infoSelect,width: 20, alt:'Saiba mais',index:4 , component: <InfoSecao/>},
    {/*{nome: 'Editar informações', icone: settingsNoSelect, iconeSelect: settingsSelect, width:25 ,alt:'edit', index:6 , component: <EditProfile/>}*/},

  ] : 
  [
    {nome: 'Criar Doacao', icone: solicNoSelec, iconeSelect: solicSelec, width:25 ,alt:'Criar Doacao', index:0 , component: <CreateQRCodeDoacao/> },
    {nome: 'Campanhas', icone: campaignNoSelect, iconeSelect: campaignSelect, width:25 ,alt:'Campanhas', index:1 , component: <Campanhas/> },
  ]

  const drawer = (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{display:'flex', justifyContent:'center', marginTop: '5%'}}>
        <img src={logo} alt='logo' width='70%' />
      </div>
      <div style={{display:'flex', justifyContent:'center', alignItems: 'center', flexDirection:'column', marginTop: '5%'}} >
      {/* <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
        </IconButton> */}
      <Avatar
        alt={profile?.name}
        src={"http://localhost:5000/files/users/" + profile?.image}
        onClick={handleModal}
        sx={{
          width: 150,
          height: 150,
          backgroundColor: '#D9D9D9',
          ":hover": {filter: "brightness(70%)"}}}
          />
      <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <ContentModal>
            <img src={logo} alt="logo" style={{marginBottom: '2%'}} />
              <div style={{display: "flex", justifyContent: 'center', alignItems:'center', flexDirection:'column'}} >                   
                <h2 style={{marginBottom: '2%'}}> Upload Avatar </h2>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div style={{display: "flex", alignItems:'center'}}>
                        <StyledButton sx={{background: 'rgba(236, 222, 222, 1)', color: 'black', '&:hover': {background: 'rgba(189, 163, 163, 1)'} }} color='secondary' startIcon={data.foto_avatar?<InsertPhotoIcon/>:<UploadIcon />} variant={data.foto_avatar?"outlined": "contained"} onClick={() => inputRef.current.click()}>
                        {data.foto_avatar?   data.foto_avatar[0].name : "Upload da foto (Máx: 10MB)"}
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
                    <div style={{display: "flex", justifyContent: 'center'}}>
                        <Button onClick={handleUploadPhoto}  variant="contained" sx={{mr: '10%', background: 'rgba(197, 23, 23, 0.81)','&:hover': {background: 'rgba(197, 23, 23, 0.6)'} }}  >Enviar</Button>
                        <Button onClick={handleClose}  variant="outlined" sx={{mr: '10%', color: 'rgba(197, 23, 23, 0.81)', borderColor: 'rgba(197, 23, 23, 0.81)','&:hover': {borderColor: 'rgba(197, 23, 23, 0.4)'}}} >Cancelar</Button>
                    </div>
                  </Grid>
                </Grid>
            </div>
          </ContentModal>
      </Modal>
      <div style={{marginTop: '2%',width:'70%', backgroundColor: '#D9D9D9', borderRadius: '5px', display: 'flex', justifyContent:'space-between', padding: '8px'}} >
        <h3>{profile?.name}</h3>
        {profile?.donator &&
          <div style={{ backgroundColor: 'rgba(204, 0, 0, 0.24)', borderRadius: '5px',padding: '2px 5px'}}>
            <h4 style={{color: 'red', margin:0}} >{profile?.donator? profile.donator.blood_type : ""}</h4>
          </div>
        }
      </div>
      </div>
      <Toolbar />
      <Divider />
      <ThemeProvider theme={theme} >
      <List sx={{ m: 1}}>
  {componentes.map((item, index) => (
    <ListItem key={index} disablePadding sx={{ borderRadius: '15px', mb: 1 }}>
      {!(selectedComponent.index === item.index) ? (
        <ListItemButton
          // emButton
          onClick={(event) => handleListItemClick(event, item)}
          sx={{ borderRadius: '15px',height: 50 }}
          selected={selectedComponent.index === item.index}
        >
          <ListItemIcon>
            <img src={item.icone} alt={item.alt} width={item.width} />
          </ListItemIcon>
          <ListItemText primary={item.nome} primaryTypographyProps={{ fontSize: '16px' }} />
        </ListItemButton>
      ) : (
        <ListItemButton
          // emButton
          onClick={(event) => handleListItemClick(event, item)}
          sx={{ borderRadius: '15px',height: 50 }}
          selected={selectedComponent.index === item.index}
        >
          <ListItemIcon>
            <img src={item.iconeSelect} alt={item.alt} width={item.width} />
          </ListItemIcon>
          <ListItemText primary={item.nome} primaryTypographyProps={{ fontSize: '16px', color: 'white' }} />
        </ListItemButton>
      )}
      
    </ListItem>
  ))}
  {/*<ListItem key={7} disablePadding sx={{ borderRadius: '15px', mb: 1 }}>
  <ListItemButton
          // emButton
          onClick={LogOut}
          sx={{ borderRadius: '15px',height: 50 }}
        >
          <ListItemIcon>
            <img src={logoutIcon} alt='sair' width='28'/>
          </ListItemIcon>
          <ListItemText primary='Sair' primaryTypographyProps={{ fontSize: '16px' }} />
        </ListItemButton>
      </ListItem>*/}
</List>
<div style={{
      position: 'absolute',
      bottom: 0, 
      left: 0, 
      color: "rgba(204, 0, 0, 1)", 
      textDecoration: 'underline', 
      cursor: 'pointer', 
      marginLeft: '5%', 
      marginBottom: '5%' }}  >

      <IconButton 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SettingsIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={Edit}>Editar Perfil</MenuItem>
        <MenuItem onClick={LogOut}>Sair</MenuItem>
      </Menu>


      </div>

      </ThemeProvider>
     
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
            display: { md: 'none' },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#EFEBEB'
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          elevation={1}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#EFEBEB' },
            border: '1px solid red'
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,bgcolor: '#EFEBEB' },
            backgroundColor: '#EFEBEB',
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {url === "/locais-doacao"? 
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <LocalDoacao/>
      </Box>
      :
      url === "/editar-perfil"? 
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <EditProfile/>
      </Box>
      :
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {selectedComponent.component}
      </Box>
      }
      
    </Box>
  );
}

Feed.propTypes = {
  window: PropTypes.func,
};

export default Feed;