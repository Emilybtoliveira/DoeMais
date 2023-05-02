import React, {useEffect,Fragment} from 'react';
import { Route, Routes,Navigate} from 'react-router-dom';
// import Route from './Route';

import Portal from '../pages/Portal';
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import Compartilhamento from '../pages/Compartilhamento'
import Dashboard from '../pages/DashBoard'
import {useSelector} from 'react-redux'

function RotaPrivada(props) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <>
    {isLoggedIn ? (
          props.element
          ) : (
            <Navigate to='/'/>
          )}
    </>
        
  );
}

function RotaPublica(props) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <>
    {!isLoggedIn ? (
          props.element
          ) : (
            <Navigate to='/dashboard'/>
          )}
    </>
        
  );
}

export default function Rotas() {
  return (
    <Fragment>
      <Routes>
      <Route path='/' exact element={<RotaPublica element={<Portal/>}/>} />
      <Route path='/cadastro' exact element={<RotaPublica element={<Cadastro/>}/>} />
      <Route path='/login' exact element={<RotaPublica element={<Login/>}/>} />
      <Route path="/dashboard" exact element={<RotaPrivada element={<Dashboard/>}/>}/>
      <Route path='/compartilhar-solicitacao/:id' exact element={<Compartilhamento/>} />
      <Route path='*' exact element={<h1>Erro 404 :)</h1>} />
    </Routes>
    </Fragment>
    
  );
}