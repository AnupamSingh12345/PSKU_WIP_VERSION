import { FETCH_BRAND_FILTER_INITIAL, UPDATE_LIST, FETCH_COUNTRY_FILTER, FETCH_SOURCE_FILTER, FETCH_CATEGORY_FILTER, FETCH_BRAND_FILTER, FETCH_PSKU_DATA } from '../actions/types';

const initialState = {
    brand: []
}

const BranddropdownReducer = (state = initialState, action) => {
   
    switch (action.type) {

        case FETCH_BRAND_FILTER:

            return {
                ...state,
                brand: action.payload['BrandList']
            }
        case FETCH_BRAND_FILTER_INITIAL:
            return {
                ...state,
                brand: []
            }

        default:
            return state;
    }
}

export default BranddropdownReducer;