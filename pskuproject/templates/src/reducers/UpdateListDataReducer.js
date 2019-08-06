
import {UPDATE_LIST_DATA} from '../actions/types';

const UpdatelistDataReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_LIST_DATA:
        const uState = JSON.parse(JSON.stringify(state));
        uState[action.key] = action.value;
        return uState;
        default:
      return state;
    }
  }
  
  export default UpdatelistDataReducer;