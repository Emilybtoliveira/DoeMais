const initialState = {
    profile: null,
    id_user: null,
    location: null,
    share_id: null,
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
        case 'SHARE_SOLICITATION':
            return { ...state, share_id: action.payload };
        
        default:
            return state;
        }

  }
  
  export default userReducer;