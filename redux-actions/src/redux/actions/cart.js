import { createAction } from "redux-actions";

export const handleError = createAction("handleError");

export const getCart = createAction("getCart");

export const addProductCart = createAction("addProductCart");

export const deleteProductCart = createAction("deleteProductCart");
