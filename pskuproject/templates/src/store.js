
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from "redux";
import CountrydropdownReducer from './reducers/CountryReducer.js'
import ChanneldropdownReducer from './reducers/SourceReducer.js'
import CategorydropdownReducer from './reducers/CategoryReducer.js'
import BranddropdownReducer from './reducers/BrandReducer'
import UpdatelistReducer from './reducers/UpdateListReducer'
import PSKUdataReducer from './reducers/DataReducer'
import UpdatelistDataReducer from './reducers/UpdateListDataReducer'
import UserDetailsReducer from './reducers/UserDetailsReducer'


const store = createStore(
    combineReducers({
        country: CountrydropdownReducer,
        channel:ChanneldropdownReducer,
        category: CategorydropdownReducer,
        brand :BranddropdownReducer,
        update: UpdatelistReducer,
        data: PSKUdataReducer,
       UpdateListData:UpdatelistDataReducer,
       userDetails: UserDetailsReducer
    }),
    applyMiddleware(thunk)
    )

export default store;