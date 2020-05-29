import { Box, Container, Grid, Toolbar } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import { navigate } from "gatsby";
import React from "react";
import { Provider } from "react-redux";
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import data from "src/data/home";
import store from "src/redux/store";

const useStyles = makeStyles((theme) => ({
    green: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: theme.palette.primary.main,
        zIndex:10,
        [theme.breakpoints.down(999)]:{
            fontSize: "0.75em"
        },
        [theme.breakpoints.down(599)]:{
            fontSize: "0.6em"
        },
        [theme.breakpoints.down(399)]:{
            fontSize: "0.4em"
        }
    },
    white: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#555",
        backgroundColor: "white",
        zIndex:8,
        [theme.breakpoints.down(959)]:{
            fontSize: "0.85em"
        },
        [theme.breakpoints.down(599)]:{
            fontSize: "0.75em"
        },
        [theme.breakpoints.down(399)]:{
            fontSize: "0.4em"
        }
    },
    orange: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: theme.palette.secondary.main,
        zIndex:9,
        [theme.breakpoints.down(959)]:{
            fontSize: "0.85em"
        },
        [theme.breakpoints.down(599)]:{
            fontSize: "0.75em"
        },
        [theme.breakpoints.down(399)]:{
            fontSize: "0.5em"
        }
    },
    black: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: "black",
        [theme.breakpoints.down(500)]:{
            fontSize: "0.7em"
        },
    },
    icon:{
        fontSize: "1em",
        marginRight: "16px"
    },
    imgSocio:{
        borderRadius: "50%",
        width: "100%"
    },
    imgLogo:{
        width: '35%',
        position: 'absolute',
        borderRadius: '50%',
        top: '0px',
        right: '-20px',
        [theme.breakpoints.down("xs")]:{
            width: '50%',
        }
    }
}))

export default function ({ location }) {
    const theme = useTheme();
    const classes = useStyles();
    const parallax = React.useRef()
    React.useEffect(()=>{
        parallax.current.scrollTo(location.state && location.state.scrollTo?location.state.scrollTo:0)
    })
    const handlerCartButton = () =>{
        navigate("/")
    }
    return (
        <Provider store={store}>
            <Box display="flex" flexDirection="column" position="absolute" width="100%" height="100%" bgcolor="black">
                <Header/>
                <Toolbar/>
                <Box flexGrow={1} position="relative" style={{overflowY: "auto"}}>
                    <Parallax pages={3.75} ref={parallax}>
                        <ParallaxLayer  offset={0} speed={3} className={classes.green} >
                            <Container id="aboutus">
                                <Box p={2}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item md={6}>
                                            <Box display="flex" flexDirection="column">
                                                <img src="images/logo-white.png" width="50%" style={{margin: "auto"}}/>
                                                <Box fontSize="5em" textAlign="center">Quienes Somos</Box>
                                            </Box>
                                        </Grid>
                                        <Grid item md={6}>
                                        {data.aboutus.map((paragraph, i)=>
                                            <Box textAlign="justify" fontSize="2.25em" pt={i===0?0:3}>{paragraph}</Box>
                                        )}
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                        </ParallaxLayer>    

                        <ParallaxLayer offset={0.5} speed={1} factor={2} className={classes.white} >
                            <Container>
                                <Box p={2}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={12}>
                                            <Box fontSize="5em" textAlign="center" width="100%" color="secondary.main" display="flex" alignItems="center" >
                                                <HowToRegIcon className={classes.icon}/>
                                                {"Misión"}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box textAlign="justify" fontSize="2.5em" ml={3} >{data.mision}</Box>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box p={2}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={12}>
                                            <Box fontSize="5em" textAlign="center" width="100%" color="secondary.main" display="flex" alignItems="center" >
                                                <VisibilityIcon className={classes.icon}/>
                                                {"Visión"}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box textAlign="justify" fontSize="2.5em" ml={3}>{data.vision}</Box>
                                        </Grid>
                                    </Grid>
                                </Box>     

                                <Box p={2}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={12}>
                                            <Box fontSize="5em" textAlign="center" width="100%" color="secondary.main" display="flex" alignItems="center" >
                                                <FormatListNumberedIcon className={classes.icon}/>
                                                {"Valores"}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                        {data.valores.map((paragraph, i)=>
                                            <Box textAlign="justify" display="list-item" ml={3} fontSize="2.5em" pt={i===0?0:3}>{paragraph}</Box>
                                        )}
                                        </Grid>
                                    </Grid>
                                </Box>                                   
                            </Container>
                        </ParallaxLayer>                        

                        <ParallaxLayer offset={1.4} speed={0.5} factor={2} className={classes.orange} >
                            <Container>
                                <Box fontSize="5em" textAlign="center" p={3}>{"Nuestros Socios"}</Box>
                                <Grid container spacing={2}>
                                    {Object.keys(data.socios).map(socio => 
                                        <>
                                            <Grid item xs={12} lg={3}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4} lg={12}>
                                                        <Box textAlign="justify" display="flex" alignItems="center" height="100%" flexDirection="column" justifyContent="center">
                                                            <Box py={2} textAlign="center" position="relative">
                                                                <img src={`images/socios/${socio}/emprendedor.jpg`} className={classes.imgSocio}/>
                                                                <img src={`images/socios/${socio}/logo.jpg`} className={classes.imgLogo}/>
                                                            </Box>
                                                            <Box fontSize="2em" textAlign="center">{data.socios[socio].nombre}</Box>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={8} lg={12} >
                                                        <Box textAlign="justify" px={2} display="flex" alignItems="center" height="100%" flexDirection="column">
                                                            <Box fontSize="2em" borderBottom="1px solid" width="100%" textAlign="center"> 
                                                                {data.socios[socio].marca}
                                                            </Box>                                                            
                                                            <Box fontSize="1.75em">
                                                                {data.socios[socio].descripcion}
                                                            </Box>                                                            
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}
                                    <Grid item sm={6}>
                                        <Box fontSize="5em" textAlign="center" width="100%" color="secondary.main" display="flex" alignItems="center" >
                                            
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Container>
                        </ParallaxLayer>


                        <ParallaxLayer offset={2.56} speed={-0.25} className={classes.black}>
                            <Footer/>
                        </ParallaxLayer>
                    </Parallax>
                </Box>
            </Box>
        </Provider>
    );
}
