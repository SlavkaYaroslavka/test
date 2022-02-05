import { combineReducers } from "redux";
import {userReducer} from './userReducer'
import {colectionsReducer} from './colectionsReducer'

export const rootReducer = combineReducers({
    tables: userReducer,
    colections: colectionsReducer
})