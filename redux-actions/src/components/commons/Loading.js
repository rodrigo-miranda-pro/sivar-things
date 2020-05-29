import { Box, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    cargando:{
        position:"absolute",
        zIndex: 100000,
        top: 0,
        left:0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "white",
        "& *":{
            margin: "auto"
        }
    }
}));

export default function (props) {
    const classes = useStyles();
    const [cargando, setCargando] = React.useState(props.loading || false);
    React.useEffect(()=>{
        setCargando(props.loading);
    }, [props.loading])

    return (<>
        {cargando &&
            <Box className={classes.cargando}>
                <Box display="flex" flexDirection="column">
                    <CircularProgress size={100} />
                    <Box fontSize="h5.fontSize" pt={3} fontWeight="bold" alignItems="center">
                        {"Sivar Things"}
                    </Box>
                </Box>
            </Box>
        }
    </>)
}