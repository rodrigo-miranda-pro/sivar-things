import { IconButton, Typography, Box } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { makeStyles } from "@material-ui/styles";
import Img from "gatsby-image";
import React from "react";

const CartProduct = withStyles((theme) => ({
    productName: {
        fontWeight: "bold", 
        fontSize: "1.25em",
        padding: theme.spacing(0, 0, 0, 1),
    },
    productDetail:{
        fontSize: "1.1em",
        padding: theme.spacing(0, 0, 0, 1),
    },
    price:{
        fontWeight: "bold", fontSize: "1.5em"        
    },
}))((props) => {
    const {
        prd,
        index,
        classes,
        onDelete,
        viewOnly
    } = props;
    return (
        <ListItem button>
            <ListItemAvatar>
                {prd.imageFluid && (
                    <Img
                        fluid={prd.imageFluid}
                        style={{ height: 50 }}
                        imgStyle={{ objectFit: "contain" }}
                    />
                )}
            </ListItemAvatar>
            <ListItemText
            >
                <Box display="flex" alignItems="center">
                    <Box flex={1}>
                        <Typography className={classes.productName}>{prd.nombre}</Typography>
                        <Typography className={classes.productDetail}>{`${prd.categoria} - ${prd.opcion}`}</Typography>
                    </Box>
                    <Box justifyContent="center" px={2} >
                        <Typography className={classes.price}>{`$${prd.precio}`}</Typography>
                    </Box>
                </Box>
            </ListItemText>

            {!viewOnly && 
                <ListItemSecondaryAction>
                    <IconButton onClick={onDelete && onDelete(index)}>
                        <RemoveShoppingCartIcon color="secondary" fontSize="small"/>
                    </IconButton>
                </ListItemSecondaryAction>
            }
        </ListItem>
    );
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        padding: 0,
        margin: "auto",
        flex: 1
    },
    noProducts:{
        fontSize: "1.2em", 
        color: "gray",
        textAlign: "center",
        color: '#ccc',
        textAlign: 'center',
        fontWeight: "bold" 
    },
    noProductsSecondary:{
        color: '#ccc',
        textAlign: 'center',
        fontSize: '1.1em',
    },
    list:{
        height: "100%"
    }
}));

export const Cart = (props) => {
    const classes = useStyles();
    const {
        products,
        viewOnly
    } = props;
    return (
        <List dense className={classes.root}>
            {products && products.length > 0? 
                products.map((prd, i) =>  <CartProduct key={`cart-item-${i}`} prd={prd} index={i} onDelete={props.onDelete} viewOnly={viewOnly}/>)
            :
                <ListItem key={`cart-item-na`} className={classes.list}>
                    <ListItemText
                        primary={"Listado de compra vacio"}
                        secondary={"Agrega uno o mas productos a tu Orden"}
                        primaryTypographyProps={{
                            className: classes.noProducts
                        }}                        
                        secondaryTypographyProps={{
                            className: classes.noProductsSecondary
                        }}                        
                    />                    
                </ListItem>
            }
        </List>
    );
};

export default Cart;
