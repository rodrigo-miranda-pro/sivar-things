import { reset, setGlobalState } from "src/redux/actions/global";
import {initialStateApp} from "src/redux/slices/app";
import {initialStateCheckout} from "src/redux/slices/checkout";

export const propsReducer = (obj) =>  Object.keys(obj).reduce((newObj, key) => {
    newObj[key] = (state = obj[key], action) => state; 
    return newObj
},{});

export const handleActions = {
    [reset]: (state, action) => {
        return {
            ...state,
            app:initialStateApp,
            checkout:initialStateCheckout,
        }
    },
    [setGlobalState]: (state, action) => {
        if(typeof action.payload === "object") 
            return {
                ...state,
                ...action.payload
            }
        return state; 
    }
}



