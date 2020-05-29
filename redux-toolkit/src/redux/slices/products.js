import { createSlice } from '@reduxjs/toolkit'
import {loadProducts} from "src/redux/thunks/products"
export default createSlice({
    name: "productos",
    initialState: {},
    extraReducers: {
        [loadProducts.fulfilled]: (state, action) => action.payload
    },
});
