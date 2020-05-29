import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { CardActionArea, Box } from "@material-ui/core";
import { navigate } from "gatsby"
import CartButton from "components/layout/CartButton";
import MenuButton from "components/layout/MenuButton";

const useStyles = makeStyles((theme) => ({
    appBar: {
        padding: "0px !important",
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolbar: {
        padding: theme.spacing(0,0,0,1),
        background: "white",
    },    
}))


export default function (props) {
    const classes = useStyles();
    const handlerCartButton = () =>{
        navigate("/")
    }    
    return (
        <AppBar
            elevation={0}
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar className={classes.toolbar}>
                <CardActionArea onClick={handlerCartButton}>
                    <img src="images/logo.jpg" height="55px" />
                </CardActionArea>
                {props.children?props.children: <>
                    <Box flexGrow={1}/>
                    <Box pr={1} display="flex">
                        <CartButton onClick={handlerCartButton}/>
                        <MenuButton/>
                    </Box>    
                </>}
            </Toolbar>
        </AppBar>        
    )
}