import { Box } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    text:{
        fontSize: "1.2em", 
        textAlign: "center",
        textAlign: 'center',
        color: theme.palette.primary.main,
        marginTop: theme.spacing(2)
    },
    textSecondary:{
        textAlign: 'center',
        fontSize: '1.1em',
    },
}));
const Efective = (props) => {
    const classes = useStyles();
    return(
        <Box display="flex">
            <ListItemText
                primary={"El pago se recíbira una vez entregada la orden"}
                secondary={"Gracias por tu compra !!"}
                primaryTypographyProps={{
                    className: classes.text
                }}                        
                secondaryTypographyProps={{
                    className: classes.textSecondary
                }}                        
            />          
        </Box>
    )
}
export default Efective;