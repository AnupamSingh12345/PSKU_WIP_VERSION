import {COUNTRY_FILTER_LOADER_OFF,BRAND_FILTER_LOADER,BRAND_FILTER_LOADER_OFF,CATEGORY_FILTER_LOADER,CATEGORY_FILTER_LOADER_OFF,SOURCE_FILTER_LOADER_OFF,SOURCE_FILTER_LOADER,TABLE_UPDATED_LOADER,UPDATED_LOADER, UPDATED_FLAG_FALSE, UPDATED_FLAG, UPDATE_LIST, FETCH_COUNTRY_FILTER, FETCH_SOURCE_FILTER, FETCH_CATEGORY_FILTER, FETCH_BRAND_FILTER, FETCH_PSKU_DATA } from '../actions/types';

const initialState = {
    data: [],
    dataupdatd: false,
    loader:false,
    tableLoader:false,
    SourceLoader:false,
    CategoryLoader: false,
    BrandLoader:false,
    CountryLoader:true

}

const PSKUdataReducer = (state = initialState, action) => {

    switch (action.type) {

        case FETCH_PSKU_DATA:

            return {
                ...state,
                data: action.payload['Data']
            }

        case UPDATED_FLAG:
            // console.log("inside reducer");
            // console.log("update Reducer",action.payload['UpdatePSKU'])
            return {
                ...state,
                dataupdatd: true,
                dataAfterUpdate: action.payload['UpdatePSKuWD']
            }

        case UPDATED_FLAG_FALSE:
            return {
                ...state,
                dataupdatd: false,
                loader: false,
                tableLoader:false
            }
            
            case UPDATED_LOADER:
            
            return {
                ...state,
                loader: true
            }
            case TABLE_UPDATED_LOADER:
            
            return {
                ...state,
                tableLoader: true
            }
            case SOURCE_FILTER_LOADER:
            return {
                ...state,
                SourceLoader: true
            }
            case SOURCE_FILTER_LOADER_OFF:
            return {
                ...state,
                SourceLoader: false
            }
            case CATEGORY_FILTER_LOADER:
            return {
                ...state,
                CategoryLoader: true
            }
            case CATEGORY_FILTER_LOADER_OFF:
            return {
                ...state,
                CategoryLoader: false
            }
            case BRAND_FILTER_LOADER:
            return {
                ...state,
                BrandLoader: true
            }
            case BRAND_FILTER_LOADER_OFF:
            return {
                ...state,
                BrandLoader: false
            }
            
            case COUNTRY_FILTER_LOADER_OFF:
            return {
                ...state,
                CountryLoader: false
            }
        default:
            return state;
    }
}

export default PSKUdataReducer;