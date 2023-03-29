const initialState = {
    profile: [],
    email: ''
  };
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'EMAIL_LOGGED':{
            return { ...state, email: action.payload };
        }
        case 'PROFILE':
            return { ...state, profile: action.payload };
        default:
            return state;
        }
  }
  
  export default userReducer;