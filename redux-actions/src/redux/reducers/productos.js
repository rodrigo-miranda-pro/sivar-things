import {handleActions} from "redux-actions";
import {getProductsSuccess} from "src/redux/actions/productos";

export default handleActions({
    [getProductsSuccess]: (state, action) => {
        return action.payload;
    }
}, {})