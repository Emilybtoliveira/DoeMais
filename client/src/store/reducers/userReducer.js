const initialState = {
    profile: null,
    id_user: null,
    location: null,
    cidade: ''
  };
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'Id_LOGGED':{
            return { ...state, id_user: action.payload };
        }
        case 'PROFILE':
            return { ...state, profile: action.payload };
        case 'LOCATION':
            return { ...state, location: action.payload };
        case 'CITY':
            return { ...state, cidade: action.payload };        
        default:
            return state;
        }

  }
  
  export default userReducer;