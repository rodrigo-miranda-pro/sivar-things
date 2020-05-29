import { createSlice } from '@reduxjs/toolkit'
export const initialStateCheckout = {
    cart: {
        products:[], 
        totalPrice:0, 
        totalProducts:0,
        success: false,
    },
    shipping: {
        clients: [],
        selectedClient: null,
        success: false,
    },
    payment: {
        method:null,
        details:null,
        success: false
    }        
};
export default createSlice({
    name: "checkout",
    initialState: initialStateCheckout,
    reducers: {
        addProductCart: (state, action) => {
            let products = state.cart.products;
            products.push(action.payload);
            state.cart.totalPrice = products.reduce((totalPrice, prd) => (totalPrice += prd.precio), null);
            state.cart.totalProducts = products.length;
            state.cart.success = products.length > 0;
        },
        deleteProductCart: (state, action) => {
            let products = state.cart.products;
            products.splice(action.payload, 1);
            state.cart.totalPrice = products.reduce((totalPrice, prd) => (totalPrice += prd.precio), null);
            state.cart.totalProducts = products.length;
            state.cart.success = products.length > 0;
        },
        updateClients: (state, action) => {
            state.shipping.clients = action.payload;
            state.shipping.selectedClient = state.shipping.clients.length? state.shipping.clients.filter(c=>c.selected)[0]: null;
            state.shipping.success = state.shipping.selectedClient?true:false;
        },
        updatePayment: (state, action) => {
            state.payment = action.payload;
            state.payment.success = state.payment.method === 'efective' || (state.payment.method === 'creditcard' && state.payment.details)
        },
        resetCheckout: () => initialStateCheckout
    },
});
