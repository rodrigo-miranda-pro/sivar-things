import { Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import { navigate } from "gatsby";
import React from "react";

const useStyles = makeStyles((theme) => ({
}));

export default function (props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const handlerClickLogo = () => {
        navigate("/");
    };
    const handleClose = () => {
        setAnchorEl(null);
    };    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickOption = (location, state) => () =>{
        navigate(location, state)
        handleClose()
    }
    return (
        <>
            <Button onClick={handleClick}>
                <MenuIcon/>
            </Button>        
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClickOption("home", {state:{scrollTo: 0}})}>{"Quienes Somos"}</MenuItem>
                <MenuItem onClick={handleClickOption("home", {state:{scrollTo: 0.4}})}>{"Misión, Visión y Valores"}</MenuItem>
                <MenuItem onClick={handleClickOption("home", {state:{scrollTo: 1.5}})}>{"Nuestros Socios"}</MenuItem>
                <MenuItem onClick={handleClickOption("privacy", {state:{privacy: "terminos"}})}>{"Términos y Condiciones"}</MenuItem>
                <MenuItem onClick={handleClickOption("privacy", {state:{privacy: "privacidad"}})}>{"Políticas de Privacidad"}</MenuItem>
            </Menu>
        </>
    );
}
