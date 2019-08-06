import { GET_USERNAME } from '../actions/types';


const initialState = {
  username: "User",
  savePerms: [],
  serverTime: new Date()
};

const UserDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERNAME:
      return {
        ...state,
        username: action.userName,
        savePerms: action.savePerms,
        serverTime: action.serverTime
      };

    default:
      return state;
  }
};

export default UserDetailsReducer;
