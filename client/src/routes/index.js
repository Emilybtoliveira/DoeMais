import React, {useEffect} from 'react';
import { Route, Routes,Navigate,Redirect  } from 'react-router-dom';
// import Route from './Route';

import Portal from '../pages/Portal';
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import {useSelector} from 'react-redux'



export default function Rotas() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const isRegister = useSelector(state => state.auth.isRegister)

  console.log(isLoggedIn)

  return (
    <Routes>
      <Route path='/' exact element={<Portal/>} />
      <Route path='/cadastro' exact element={<Cadastro/>} />
      <Route path='/login' exact element={<Login/>} />
      <Route path='*' exact element={<h1>Erro 404 :)</h1>} />
    </Routes>
  );
}