import { Box } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import _ from 'lodash';
import React from "react";
import { config, Spring } from 'react-spring/renderprops';
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    totalPriceButton:{
        fontSize: "2em",
    },  
    badgeCount:{
        "& span":{
            fontSize: '0.75em',
            fontWeight: 'bold',
            letterSpacing: '2px',         
        }
    },    
}))


export default function (props) {
    const classes = useStyles();
    const totalProducts = useSelector(s => s.cart.totalProducts);
    const totalPrice = useSelector(s => s.cart.totalPrice);    
    const {onClick} = props;
    return (
        <Button
            disableElevation
            className={classes.totalPriceButton}
            endIcon={
                <Badge color="secondary" className={classes.badgeCount} badgeContent={totalProducts} >
                    <ShoppingCartIcon style={{fontSize:"1.5em"}}/>
                </Badge>                    
            }
            onClick={onClick}
        >
            {totalPrice && totalPrice > 0 ? 
                <Spring
                    config={config.slow}
                    to={ {number: totalPrice} }>
                    {props => <Box display="flex" alignItems="baseline">
                        ${_.round(props.number,0)}
                        <span style={{fontSize: "0.75em"}}>{(totalPrice % 1).toFixed(2).substring(1)}</span>
                    </Box>}
                </Spring>
            : ""}
        </Button>      
    )
}