import { UPDATE_LIST, FETCH_COUNTRY_FILTER, FETCH_SOURCE_FILTER, FETCH_CATEGORY_FILTER, FETCH_BRAND_FILTER, FETCH_PSKU_DATA } from '../actions/types';

const initialState = {
  country: []
}

const CountrydropdownReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_COUNTRY_FILTER:

      return {
        ...state,
        country: action.payload['CountryList']
      }

    default:
      return state;
  }
}

export default CountrydropdownReducer;