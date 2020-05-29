import { graphql, useStaticQuery } from "gatsby";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import appSlice from 'src/redux/slices/app';
import checkoutSlice from 'src/redux/slices/checkout';
import { loadProducts } from "src/redux/thunks/products";

export default (props) => {
    const dispatch = useDispatch();
    const totalProducts = useSelector(s => s.checkout.cart.totalProducts);
    const totalPrice = useSelector(s => s.checkout.cart.totalPrice);
    const productos = useSelector(s => s.productos);
    const showCheckoutMobile = useSelector(s => s.app.showCheckoutMobile);

    const useInit = () =>{
        var images = useImagesProducts();
        useEffect(() => {
            dispatch(loadProducts(images));
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
        dispatch(checkoutSlice.actions.addProductCart(product));
    }
    
    const dispatchSetAppState = (obj) =>{
        dispatch(appSlice.actions.setState(obj));
    }

    return {
        ...props,
        productos,
        totalProducts,
        totalPrice,
        addCart,
        useInit,
        showCheckoutMobile,
        dispatchSetAppState
    };
};
