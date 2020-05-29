import { createSlice } from '@reduxjs/toolkit'
import {sendEmailTicket} from "src/redux/thunks/emailTicket"
export const initialStateApp = {
    panelCheckoutExpanded: "cart",
    showCheckoutMobile: false,        
}
export default createSlice({
    name: "app",
    initialState: initialStateApp,
    reducers: {
        setState: (state, action) => {
            if(typeof action.payload === "object") 
                Object.keys(action.payload).forEach((key)=>state[key] = action.payload[key])
            return state
        }
    },
    extraReducers: {
        [sendEmailTicket.fulfilled]: (state, action) => {}
    },
});
