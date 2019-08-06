import { FETCH_SOURCE_FILTER_INITIAL, UPDATE_LIST, FETCH_COUNTRY_FILTER, FETCH_SOURCE_FILTER, FETCH_CATEGORY_FILTER, FETCH_BRAND_FILTER, FETCH_PSKU_DATA } from '../actions/types';

const initialState = {
  channel: []
}

const ChanneldropdownReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_SOURCE_FILTER:

      return {
        ...state,
        channel: action.payload['ChannelList']
      }
    case FETCH_SOURCE_FILTER_INITIAL:
      return {
        ...state,
        channel: []
      }

    default:
      return state;
  }
}

export default ChanneldropdownReducer;