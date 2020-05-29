import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImages } from "src/redux/actions/images";
import { getProducts } from "src/redux/actions/productos";
import { setGlobalState } from "src/redux/actions/global";
import { addProductCart } from 'src/redux/actions/cart';
import { graphql, useStaticQuery } from "gatsby";
export default (props) => {
    const dispatch = useDispatch();
    const totalProducts = useSelector(s => s.cart.totalProducts);
    const totalPrice = useSelector(s => s.cart.totalPrice);
    const productos = useSelector(s => s.productos);
    const showCheckoutMobile = useSelector(s => s.showCheckoutMobile);

    const useInit = () =>{
        var images = useImagesProducts();
        useEffect(() => {
            console.log(dispatch(getProducts(images)));
            console.log(dispatch(getImages(images)));
        }, []);        
    }

    const useImagesProducts = () => {
        var images = {};
        const allProdcutsImages = useStaticQuery(graphql`
            {
                allFile(filter: { sourceInstanceName: { eq: "products" } }) {
                    edges {
                        node {
                            childImageSharp {
                                fluid {
                                    originalName
                                    ...GatsbyImageSharpFluid_withWebp
                                } 
                            }
                        }
                    }
                }
            }
        `);
        images = allProdcutsImages.allFile.edges.reduce((o, va) => {
            o[
                va.node.childImageSharp.fluid.originalName
                    .split(".")
                    .slice(0, -1)
                    .join(".")
            ] = {
                fluid: va.node.childImageSharp.fluid,
            };
            return o;
        }, {});
        return images;
    };

    const addCart = (product) =>{
        dispatch(addProductCart(product));
    }
    
    const dispatchSetGlobalState = (obj) =>{
        dispatch(setGlobalState(obj));
    }

    return {
        ...props,
        productos,
        totalProducts,
        totalPrice,
        addCart,
        useInit,
        showCheckoutMobile,
        dispatchSetGlobalState
    };
};
