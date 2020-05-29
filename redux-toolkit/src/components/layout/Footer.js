import { Box, Container, Grid, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Link from "components/commons/Link";
import React from "react";

const useStyles = makeStyles((theme) => ({
    footer:{
        background: "black",
        color: "white",
        "& *": {
            margin: "auto",
            textAlign: "center"
        },
        "& button":{
            color: "white",
        },
        "& h6":{fontWeight: "bold"},
        "& a":{
            color: "white",
            padding: theme.spacing(1, 2),
            margin: theme.spacing(1, 2),
            border: "1px solid",
            minWidth: 225,
            fontSize: "1.2em"
        }
    }
}))


export default function (props) {
    const classes = useStyles();
    const handlerSocialMedia = (socialMedia) => () =>{
        let location;
        switch (socialMedia) {
            case "facebook":
                location = "https://www.facebook.com/Sivarthings-El-Salvador-107161357673647"
            break;
            case "instagram":
                location = "https://www.instagram.com/sivarthings_sv"
            break;
        }
        window.open(location,'_blank');
    }
    return (
        <Box className={classes.footer} letterSpacing="1.25px" p={2}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Box fontSize="1.5em" color="secondary.main" fontWeight="bold">{"Contáctanos"}</Box>
                        <Box fontSize="1.2em">
                            {"Puedes escribirnos a "}
                            <Box component="span" color="primary.main" fontWeight="bold">consultasivarthings@gmail.com</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Box fontSize="1.5em" color="secondary.main" fontWeight="bold">{"Asóciate"}</Box>
                        <Box fontSize="1.2em">
                            {"Envíanos un correo a "}
                            <Box component="span" color="primary.main" fontWeight="bold">sociosivarthings@gmail.com</Box> 
                            {" y forma parte de la familia SIVATHINGS."}
                        </Box>
                    </Grid>         
                    <Grid item xs={8} >
                        <Grid container alignItems="center" style={{justifyContent:"center"}}>
                            <Link to="home" state={{scrollTo: 0}}>{"Quienes Somos"}</Link>
                            <Link to="home" state={{scrollTo: 0.4}}>{"Misión, Visión y Valores"}</Link>
                            <Link to="home" state={{scrollTo: 1.5}}>{"Nuestros Socios"}</Link>
                            <Link to="privacy" state={{privacy: "terminos"}}>{"Términos y Condiciones"}</Link>
                            <Link to="privacy" state={{privacy: "privacidad"}}>{"Políticas de Privacidad"}</Link>
                        </Grid>        
                    </Grid>        
                    <Grid item xs={12}>
                        <IconButton onClick={handlerSocialMedia("facebook")}><FacebookIcon fontSize="large"/></IconButton>
                        <IconButton onClick={handlerSocialMedia("instagram")}><InstagramIcon fontSize="large"/></IconButton>
                    </Grid>                                                 
                    <Grid item xs={12}>
                        <Box className="copyright" fontSize="1.1em" textAlign="center">
                            {`© ${new Date().getFullYear()}, SIVARTHINGS S.A DE C.V`}
                        </Box>
                    </Grid>                
                </Grid>
            </Container>
        </Box>
    )
}