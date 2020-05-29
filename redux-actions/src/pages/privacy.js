import { Box, Container, Toolbar } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import { navigate } from "gatsby";
import React from "react";
import { Provider } from "react-redux";
import data from "src/data/home";
import store from "src/redux/store";

const useStyles = makeStyles((theme) => ({
    subtitle:{
        color: theme.palette.secondary.main,
        fontSize: "1.5em",
        fontWeight: "bold"
    },
    container:{
        textAlign:"justify",
        padding:theme.spacing(4,4,6,4)
    }
}))

const Template = (props) => {
    const classes = useStyles();
    const { data } = props;
    return (
        <>{data && 
            <Container className={classes.container}>
                <Box textAlign="center" fontSize="2em" color="primary.main" fontWeight="bold" pb={3}>{data.titulo}</Box>
                {data.list.map(o =>
                    <Box fontSize="1.5em" py={1} className={typeof o === "string"? "" : classes.subtitle}>
                        {typeof o === "string"? o : o.subtitulo}
                    </Box>
                )}
            </Container>
        }</>
    )
}

export default function ({ location }) {
    const theme = useTheme();
    const classes = useStyles();
    const handlerCartButton = () =>{
        navigate("/")
    }
    React.useEffect(()=>{
        !location.state.privacy && navigate("/")
    },[])
    return (
        <Provider store={store}>
            <Header/>
            <Toolbar/>
            {location.state && location.state.privacy && 
                <Box flexGrow={1} position="relative" style={{overflowY: "auto"}}>
                    <Template data={data[location.state.privacy]}/>
                    <Footer/>                    
                </Box>
            }
        </Provider>
    );
}
