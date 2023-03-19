import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import {Bar} from './styles' 
import * as palette from "../../utils/variablesColor"
import {Link} from 'react-router-dom'

import logo from '../../assets/logo.svg'

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};



export default function Header(props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
    const url = window.location.pathname
    return (
    <React.Fragment>
      <CssBaseline />
      <Bar style={{background: 'rgba(239, 235, 235, 1)', marginTop: 0}}  elevation={trigger? 4 : 0} >
        <Toolbar className='toolbar'>
            <Link to='/' >
                <img src={logo} alt='logo' className='logo' />
            </Link>
            <div className='menu' >
                <Link  className='link' to='/' style={{borderBottom: url === '/'? "3px solid rgba(204, 0, 0, 1)":'none'}}>
                     <h3>Portal</h3>
                </Link>
                <Link  className='link' to='/entrar' style={{borderBottom: url === '/entrar'? "3px solid rgba(204, 0, 0, 1)":'none'}}>
                    <h3>Quero Doar!</h3>
                </Link>

            </div>
        </Toolbar>
      </Bar>
      <Toolbar id="back-to-top-anchor" />
      {/* <Container>
        <Box sx={{ my: 2, border: '1px solid red' }}>
          Opa
        </Box>
      </Container> */}
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}