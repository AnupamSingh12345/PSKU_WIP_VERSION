import {UPDATE_LIST} from '../actions/types';

const UpdatelistReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_LIST:
        const uState = JSON.parse(JSON.stringify(state));
        uState[action.key] = action.value;
        return uState;
        default:
      return state;
    }
  }
  
  export default UpdatelistReducer;