import React from "react";
import { Provider } from "react-redux";
import store from "src/redux/store";
import Main from "components/main";

export default function () {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}
