import React from 'react';
import { AppBar, Button, IconButton, Toolbar, fade, InputBase } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    principal:{
        background: "white"
    },
    container: {
        minHeight: '70vh',
    },
    footer: {
        minHeight: "calc(30vh)",
        background: "#000",
        color: "white",
        display: "flex",
        alignItems: "center",
        "& *":{
            textAlign: "center",
            flex: 1
        }
    },
    grow: {
        flexGrow: 1,
    },
    toolbar:{
        paddingLeft: 5,
        background: "white"
    }
}));

const Header = function () {
    const classes = useStyles();
    return (
        <AppBar elevation={0} position="fixed">
            <Toolbar className={classes.toolbar}>
                <img src="images/logo.jpg" height="55px" />
                <div className={classes.grow} />
                <IconButton>
                    <ShoppingCartIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

const Footer = function () {
    const classes = useStyles();
    return (
        <Box className={classes.footer}>
            <Typography>Copyright</Typography>
        </Box>
    )
}

export default function (props) {
    const classes = useStyles();
    return (
        <Box className={classes.principal}>
            <Header />
            <Toolbar/>
            <Box className={classes.container}>
                {props.children}
            </Box>
            <Footer />
        </Box>
    );
}
