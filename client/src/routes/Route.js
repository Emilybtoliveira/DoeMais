import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, useLocation } from 'react-router-dom'

// import AuthLayout from '../pages/_layouts/auth'
// import DefaultLayout from '../pages/_layouts/default'

// import { signOut } from '../store/modules/auth/actions'
// import { useDispatch } from 'react-redux'
// import { store } from '../store'
// import { message } from 'antd'


export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const location = useLocation();

  // Desloga o usuário se a rota for requisitada


  // Se estiver logado valida token

  // não redirecionar caso a rota atual esteja presente na lista abaixo

    if (!isPrivate) {
      return <Redirect to="/dashboard" />
    }

    // Se não estiver logado redireciona para a tela de login
    if (isPrivate) {
      return <Redirect to="/" />
    }
//   }


  // Condição para renderizar layout

  return (
    <Route
      {...rest}
      render={props => (
          <Component {...props} />
      )}
    />
  )
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

RouteWrapper.defaultProps = {
  isPrivate: false,
  isAdm: false
}