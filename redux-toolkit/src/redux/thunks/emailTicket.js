import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
export const sendEmailTicket = createAsyncThunk("sendEmailTicket", async (data, thunkApi) => {
    //Activar Envio para tereceros - https://myaccount.google.com/lesssecureapps
    let response = await axios.post(`https://us-central1-sivar-things.cloudfunctions.net/sendTicketEmail`, data);
    return response.data;
});
