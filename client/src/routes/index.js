import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Route from './Route';

import Portal from '../pages/Portal';
import Cadastro from '../pages/Cadastro'

export default function Rotas() {
  
  return (
    <Routes>
      <Route path='/' exact element={<Portal/>} />
      <Route path='/cadastro' exact element={<Cadastro/>} />
      <Route path='*' exact element={<h1>Erro 404 :)</h1>} />
    </Routes>
  );
}