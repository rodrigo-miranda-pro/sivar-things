import { useDispatch, useSelector } from "react-redux";
import { reset } from 'src/redux/actions/global';
import appSlice from 'src/redux/slices/app';
import checkoutSlice from 'src/redux/slices/checkout';
import {sendEmailTicket} from "src/redux/thunks/emailTicket"

export default (props) => {
    const dispatch = useDispatch();
    const expanded = useSelector(s => s.app.panelCheckoutExpanded);
    const checkout = useSelector(s => s.checkout);

    const handlerDeleteProductCart = (index) => (event)=>{
        dispatch(checkoutSlice.actions.deleteProductCart(index));
    }

    const updateClientList = (newList) => {
        dispatch(checkoutSlice.actions.updateClients(newList));
    }

    const updatePaymentMethod = (data) => {
        dispatch(checkoutSlice.actions.updatePayment(data));
    }
    
    const dispatchResetCheckout = () => {
        dispatch(reset());
    }
    
    const dispatchUpdateExpanded = (expand) => {
        dispatch(appSlice.actions.setState({panelCheckoutExpanded: expand}));
    }

    const dispatchSendTicketEmail = (data, callback) => {
        dispatch(sendEmailTicket(data)).then(callback);
    }

    return {
        updateClientList,
        handlerDeleteProductCart,
        updatePaymentMethod,
        checkout,
        dispatchResetCheckout,
        expanded,
        dispatchUpdateExpanded,
        dispatchSendTicketEmail
    };
};
