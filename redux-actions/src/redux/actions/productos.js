import {createAction} from "redux-actions";
import firebase from "gatsby-plugin-firebase";

export const handleError = createAction("handleError");

export const getProductsSuccess = createAction("getProductsSuccess");

export const getProducts = (images) => async (dispatch) =>{
    try{
        var prds = window.localStorage.getItem("productos");
        var prds_v = window.localStorage.getItem("productos_version");
        if (!prds || !prds_v || prds_v !== process.env.API_PRODUCTS_VERSION) {
            const collection = await firebase.firestore().collection("productos").get();
            prds = {};
            collection.forEach((document) => {
                let element = {...document.data()};
                element.id = document.id;
                if(images[element.imagen]) element.imageFluid = images[element.imagen].fluid;
                prds[element.categoria]? prds[element.categoria].push(element): prds[element.categoria] = [element];
            });
            window.localStorage.setItem("productos", JSON.stringify(prds));
            window.localStorage.setItem("productos_version", JSON.stringify(process.env.API_PRODUCTS_VERSION));
        } 
        else prds = JSON.parse(prds);            
        dispatch(getProductsSuccess(prds))
    }catch(error){
        dispatch(handleError(error));
    }
}