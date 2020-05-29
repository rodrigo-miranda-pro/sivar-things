import { handleActions } from "redux-actions";
import {deleteProductCart, addProductCart, getCart } from "src/redux/actions/cart";

export default handleActions(
    {
        [getCart]: (state, action) => {
            return action.payload
        },
        [addProductCart]: (state, action) => {
            let products = [...state.products, action.payload];
            let totalPrice = products.reduce((totalPrice, prd) => (totalPrice += prd.precio), null);
            let totalProducts = products.length;
            return {products, totalPrice, totalProducts};
        },
        [deleteProductCart]: (state, action) => {
            let products = [...state.products].filter((o, i) => i!== action.payload);
            let totalPrice = products.reduce((totalPrice, prd) => (totalPrice += prd.precio), null);
            let totalProducts = products.length;
            return {products, totalPrice, totalProducts};
        },
    },
    {products: [], totalPrice: 0, totalProducts: 0}
);

