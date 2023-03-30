export function IsRegister() {
  return { type: 'IS_REGISTER' };
}

export function logIn(email) {
    return { type: 'LOG_IN', payload: email };
  }
  
  export function logOut() {
    return { type: 'LOG_OUT' };
  }