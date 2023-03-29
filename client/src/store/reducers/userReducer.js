const initialState = {
    profile: [],
    id_user: null
  };
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'Id_LOGGED':{
            return { ...state, id_user: action.payload };
        }
        case 'PROFILE':
            return { ...state, profile: action.payload };
        default:
            return state;
        }
  }
  
  export default userReducer;