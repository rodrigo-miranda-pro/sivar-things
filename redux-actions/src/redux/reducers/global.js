import {resetCheckout, updateExpanded, setGlobalState} from "src/redux/actions/global";

export const propsReducer = (obj) =>  Object.keys(obj).reduce((newObj, key) => {
    newObj[key] = (state = obj[key], action) => state; 
    return newObj
},{});

export const handleActions = {
    [resetCheckout]: (state, action) => {
        return {
            ...state,
            cart:{products:[], totalPrice: 0, totalProducts: 0},
            clients:[],
            payment:{},
            expanded: "cart",
            showCheckoutMobile: false
        }
    },
    [setGlobalState]: (state, action) => {
        if(typeof action.payload === "object") 
            return {
                ...state,
                ...action.payload
            }
        return state;
    },    
    [updateExpanded]: (state, action) => {
        return {
            ...state,
            expanded: action.payload
        }
    },
}



