const initialState = {
  isLoggedIn: false,
  isRegister: false
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, isLoggedIn: true };
    case 'IS_REGISTER':
    return { ...state, isRegister: true };
    case 'LOG_OUT':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

export default authReducer;