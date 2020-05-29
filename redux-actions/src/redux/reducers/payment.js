import { handleActions } from "redux-actions";
import { updatePayment } from "src/redux/actions/payment";

export default handleActions(
    {
        [updatePayment]: (state, action) => {
            return action.payload;
        } 
    },
    {}
);

