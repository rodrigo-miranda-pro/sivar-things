import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import productos from "src/redux/reducers/productos"
import images from "src/redux/reducers/images"
import cart from "src/redux/reducers/cart"
import clients from "src/redux/reducers/clients"
import payment from "src/redux/reducers/payment"
import {handleActions, propsReducer} from "src/redux/reducers/global"

const partialReducers = combineReducers({
    productos,
    images,
    clients,
    cart,
    payment,
    ...propsReducer({
        expanded: "cart",
        showCheckoutMobile: false,
    }),    
});

const globalReducers = (state, action) => {   
    if(handleActions[action.type]) return handleActions[action.type](state, action);
    return partialReducers(state, action)
};


const store = createStore(globalReducers, applyMiddleware(thunk));

export default store;

