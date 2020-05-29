import React from "react";
import Layout from "components/layout";
import Productos from "components/productos";
import controller from "./controller"
import viewController from "src/hocs/viewController"

const Main = function (props) {
    const {
        showCheckoutMobile,
        productos,
        addCart,
        useInit,
        dispatchSetGlobalState
    } = props;
    useInit();
    return(
        <Layout showCheckoutMobile={showCheckoutMobile} setGlobalState={dispatchSetGlobalState}>
            <Productos productos={productos} addCart={addCart}/>
        </Layout>
    )
}

export default viewController(Main, controller);