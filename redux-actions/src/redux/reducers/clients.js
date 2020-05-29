import { handleActions } from "redux-actions";
import { updateClients } from "src/redux/actions/clients";

export default handleActions(
    {
        [updateClients]: (state, action) => {
            return action.payload;
        } 
    },
    []
);

