import { graphql, useStaticQuery } from "gatsby";
import Imagen from "gatsby-image";
import firebase from "gatsby-plugin-firebase";
import React, { useEffect, useState } from "react";
// import obj from "../static/json/data.json";

export const useInit = (props) => {
    var images = useImagesProducts();
    useEffect(() => {
        console.log(props.getProducts(images));
        console.log(props.getImages(images));
    }, []);
};

const useUploadInitialData = (categoria) => {
    var collection = "productos";
    // var obj = obj ? obj : null;
    var obj = null;
    firebase
        .firestore()
        .collection(collection)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                firebase
                    .firestore()
                    .collection(collection)
                    .doc(doc.id)
                    .delete();
            });
            Object.keys(obj).forEach((categoria) => {
                obj[categoria].forEach((element) => {
                    firebase.firestore().collection(collection).add(element);
                });
            });
        });
};

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
