import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux"
import { handleActions, propsReducer } from "src/redux/reducers/global"
import checkout from "src/redux/slices/checkout"
import productos from "src/redux/slices/products"
import app from "src/redux/slices/app"

const allReducers = combineReducers({
    app: app.reducer,
    productos: productos.reducer,
    checkout: checkout.reducer    
});

const globalReducers = (state, action) => {   
    if(handleActions[action.type]) return handleActions[action.type](state, action);
    return allReducers(state, action)
};

const store = configureStore({reducer: globalReducers});

export default store;

