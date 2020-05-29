import { createAction } from "redux-actions";
import axios from "axios";

export const handleError = createAction("handleError");
export const resetCheckout = createAction("resetCheckout");
export const updateExpanded = createAction("updateExpanded");
export const setGlobalState = createAction("setGlobalState");

export const sendTicketEmail = (data, callback) => async (dispatch) =>{
    //Activar Envio para tereceros - https://myaccount.google.com/lesssecureapps
    try{
        let response = await axios.post(`https://us-central1-sivar-things.cloudfunctions.net/sendTicketEmail`, data);
        callback({success: true, message: "Correo Enviado"})
    }catch(error){
        dispatch(handleError(error));
        callback({success: false, message: "Problemas al Enviar Correo"})
    }
}
