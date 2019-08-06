import { FETCH_CATEGORY_FILTER_INITIAL, UPDATE_LIST, FETCH_COUNTRY_FILTER, FETCH_SOURCE_FILTER, FETCH_CATEGORY_FILTER, FETCH_BRAND_FILTER, FETCH_PSKU_DATA } from '../actions/types';

const initialState = {
    category: []
}

const CategorydropdownReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_CATEGORY_FILTER:

            return {
                ...state,
                category: action.payload['CategoryList']
            }
        case FETCH_CATEGORY_FILTER_INITIAL:
            return {
                ...state,
                category: []
            }

        default:
            return state;
    }
}

export default CategorydropdownReducer;