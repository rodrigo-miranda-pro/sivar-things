import { handleActions } from "redux-actions";
import { getImages } from "src/redux/actions/images";

export default handleActions(
    {
        [getImages]: (state, action) => {
            return action.payload
        },
    },
    {}
);
