import React from "react";
export default (view, controller) => {
    return (props) => {
        return view(controller(props));
    };
};
