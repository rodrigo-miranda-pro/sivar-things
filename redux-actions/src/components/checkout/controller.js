import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductCart } from "src/redux/actions/cart";
import { updateClients } from 'src/redux/actions/clients';
import { updatePayment } from 'src/redux/actions/payment';
import { resetCheckout, updateExpanded, sendTicketEmail } from 'src/redux/actions/global';

export default (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(s => s.cart);
    const clients = useSelector(s => s.clients);
    const selectedClient = useSelector(s => s.clients.length? s.clients.filter(c=>c.selected)[0]: null);
    const payment = useSelector(s => s.payment);
    const expanded = useSelector(s => s.expanded);

    const checkout = {
        cart: {
            ...cart,
            success: cart.products.length > 0,
        },
        client: {
            clients: clients,
            selectedClient: selectedClient,
            success: selectedClient?true:false,
        },
        payment: {
            ...payment,
            success: payment.method === 'efective' || (payment.method === 'creditcard' && payment.details)
        }
    }

    const handlerDeleteProductCart = (index) => (event)=>{
        dispatch(deleteProductCart(index));
    }

    const updateClientList = (newList) => {
        dispatch(updateClients(newList));
    }

    const updatePaymentMethod = (data) => {
        dispatch(updatePayment(data));
    }
    
    const dispatchResetCheckout = () => {
        dispatch(resetCheckout());
    }
    
    const dispatchUpdateExpanded = (expand) => {
        dispatch(updateExpanded(expand));
    }

    const dispatchSendTicketEmail = (data, callback) => {
        dispatch(sendTicketEmail(data, callback));
    }

    return {
        updateClientList,
        selectedClient,
        handlerDeleteProductCart,
        updatePaymentMethod,
        checkout,
        dispatchResetCheckout,
        expanded,
        dispatchUpdateExpanded,
        dispatchSendTicketEmail
    };
};
