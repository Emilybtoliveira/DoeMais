import React, {useEffect,Fragment} from 'react';
import { Route, Routes,Navigate} from 'react-router-dom';
// import Route from './Route';

import Portal from '../pages/Portal';
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import ConfirmEmail from '../pages/ConfirmEmail'
import CadastroAdmin from '../pages/CadastroAdmin'
import RecoverPassword from '../pages/RecoverPassword'
import ForgotPassword from '../pages/ForgotPassword'
import ValidateDonation from '../pages/ValidateDonation'
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
      {(props.element)}
    </> 
  );
}

export default function Rotas() {
  return (
    <Fragment>
      <Routes>
      <Route path='/' exact element={<RotaPublica element={<Portal/>}/>} />
      <Route path='/cadastro' exact element={<RotaPublica element={<Cadastro/>}/>} />
      <Route path='/cadastro-admin' exact element={<RotaPublica element={<CadastroAdmin/>}/>} />
      <Route path='/login' exact element={<RotaPublica element={<Login/>}/>} />
      <Route path="/confirm-email" exact element={<RotaPublica element={<ConfirmEmail/>}/>}/>
      <Route path="/forgot-password" exact element={<RotaPublica element={<ForgotPassword/>}/>}/>
      <Route path="/recover-password" exact element={<RotaPublica element={<RecoverPassword/>}/>}/>
      <Route path="/validate-donation-register/:id" exact element={<RotaPublica element={<ValidateDonation/>}/>}/>
      <Route path="/dashboard" exact element={<RotaPrivada element={<Dashboard/>}/>}/>
      <Route path="/dashboard" exact element={<RotaPrivada element={<Dashboard/>}/>}/>
      <Route path="/locais-doacao" exact element={<RotaPrivada element={<Dashboard/>}/>}/>
      <Route path="/editar-perfil" exact element={<RotaPrivada element={<Dashboard/>}/>}/>
      <Route path='*' exact element={<h1>Erro 404 :)</h1>} />
    </Routes>
    </Fragment>
    
  );
}