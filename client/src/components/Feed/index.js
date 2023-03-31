import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
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

import logo from '../../assets/logo.svg'
import solicNoSelec from '../../assets/Feed/solicNoSelec.svg'
import solicSelec from '../../assets/Feed/solicSelec.svg'
import addSolicNoSelec from '../../assets/Feed/addSolicNoSelec.svg'
import addSolicSelec from '../../assets/Feed/addSolicSelec.svg'
import histNoSelect from '../../assets/Feed/histNoSelect.svg'
import histSelect from '../../assets/Feed/histSelect.svg'
import infoNoSelect from '../../assets/Feed/infoNoSelect.svg'
import infoSelect from '../../assets/Feed/infoSelect.svg'
import {useSelector, useDispatch} from 'react-redux'
import { logOut } from '../../store/actions/authActions';
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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState({ index:0,component: <Solicitacoes/>}); // Novo estado
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleListItemClick = (event, component) => {
    setSelectedComponent({index: component.index, component: component.component}); 
  };

  const LogOut = () => {
    dispatch(logOut())
    window.reload()
  }

  const componentes = [
    {nome: 'Solicitações', icone: solicNoSelec, iconeSelect: solicSelec, width:25 ,alt:'Solicitações de Doação', index:0 , component: <Solicitacoes/> },
    {nome: 'Solicitar doação', icone: addSolicNoSelec,iconeSelect: addSolicSelec, width:18 , alt:'Solicitar doação',index:1 , component: <AddSolicitacoes/> },
    {nome: 'Registro de doações', icone: histNoSelect, iconeSelect: histSelect,width: 20, alt:'Registro de doações',index:2 , component: <HistoricoDoacao/> },
]
  const drawer = (
    <div>
      <div style={{display:'flex', justifyContent:'center', marginTop: '5%'}}>
        <img src={logo} alt='logo' width='70%' />
      </div>
      <div style={{display:'flex', justifyContent:'center', alignItems: 'center', flexDirection:'column', marginTop: '5%'}} >
      {/* <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
        </IconButton> */}
      <Avatar alt={profile?.name} src="/static/images/avatar/1.jpg"  sx={{ width: 150, height: 150, backgroundColor: '#D9D9D9' }}/>
      <div style={{marginTop: '2%',width:'70%', backgroundColor: '#D9D9D9', borderRadius: '5px', display: 'flex', justifyContent:'space-between', padding: '8px'}} >
        <h3>{profile?.name}</h3>
        <div style={{ backgroundColor: 'rgba(204, 0, 0, 0.24)', borderRadius: '5px',padding: '2px 5px'}}>
            <h4 style={{color: 'red', margin:0}} >{profile?.donator.blood_type}</h4>
        </div>
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
</List>
<div style={{color: "rgba(204, 0, 0, 1)", textDecoration: 'underline', cursor:'pointer', marginLeft: '5%'}} onClick={LogOut} >SAIR</div>

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
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,bgcolor: '#EFEBEB' },
            backgroundColor: '#EFEBEB'
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {selectedComponent.component}
      </Box>
    </Box>
  );
}

Feed.propTypes = {
  window: PropTypes.func,
};

export default Feed;