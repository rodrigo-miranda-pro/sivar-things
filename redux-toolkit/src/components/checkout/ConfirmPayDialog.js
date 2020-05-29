import { DialogActions, DialogContent, DialogTitle, Grid, Typography, Box, CardHeader, IconButton, CircularProgress } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { red } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ClientCard from 'components/clients/ClientCard';
import CreditCardCard from 'components/payments/CreditCardCard';
import React from "react";
import Cart from 'components/cart';
import Efective from "components/payments/Efective";
import ShopTicket from "components/templates/email/ShopTicket";
import CloseIcon from '@material-ui/icons/Close';
import ShopIcon from '@material-ui/icons/Shop';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { renderToString } from 'react-dom/server'
import Loading from "components/commons/Loading";

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        padding: theme.spacing(1),
    },
    dialogActions: {
        padding: theme.spacing(0,1,1,1),
    },
    backdrop: {
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "grayscale(1) blur(2px)",
    },
    cardHeader: {
        padding: theme.spacing(2,2,1,2)
    },
    title: {
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        color: theme.palette.primary.main,
    },
    button: {
        fontSize: "1.6em",
        flex: 1,
        lineHeight: "1.5em",
        margin: theme.spacing(0, 2, 1, 2),
        textTransform: "capitalize"
    },
    cargando:{
        position:"absolute",
        zIndex: 1,
        top: 0,
        left:0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(2px)",
        "& *":{
            margin: "auto"
        }
    }
}));

export default function (props) {
    const classes = useStyles();
    const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"));
    const { onClose, open } = props;
    const {
        onShopping,
        checkout: {
            cart:{products, totalPrice },
            shipping: {selectedClient},
            payment
        }
    } = props;

    const [cargando, setCargando] = React.useState(false);
    const [paid, setPaid] = React.useState();
    const [idord, setIdord] = React.useState();

    const onEnter = () => {
        setPaid(false);
        setCargando(false)
    }

    const handleClose = () => {
        onClose(paid);
    };

    const handleClickShopping = () => {
        let idord = Math.floor(Math.random() * 10000) + 1;
        setIdord(idord);
        setCargando(true)
        const message = renderToString(<ShopTicket {...{products, totalPrice, selectedClient, payment, idord}}/>)
        onShopping(
            {email: selectedClient.email, message: message}, 
            onShoppingCallback
        )
    };

    const onShoppingCallback = () => {
        setCargando(false);
        setPaid(true);
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            onClose={handleClose}
            onEnter={onEnter}
            open={open}
            fullWidth
            maxWidth="sm"
            scroll="paper"
            BackdropProps={{
                timeout: 0,
                className: classes.backdrop,
            }}
        >
        {/* {cargando?<ShopTicket {...{products, totalPrice, selectedClient, payment, idord}}/>:<>  */}
            <CardHeader
                action={
                    <IconButton elvation={0} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                }
                title={<img src="images/logo.jpg" height="55px" />}
                subheader={!paid?"Confirmar Compra": ""}
                className={classes.cardHeader}
                titleTypographyProps={{
                    className: classes.title,
                    variant: "h6",
                }}
                subheaderTypographyProps={{ variant: "h5", className: classes.subtitle,}}                
            />
            {paid &&
                <Box display="flex" alignItems="flex-end" borderBottom={1} borderColor="gray" pb={1} mx={3} my={2} color="primary.main">
                    <CheckCircleOutlineIcon/>
                    <Box flex="1" pl={1} fontSize="subtitle1.fontSize">{"Compra realizada con Exito!!"}</Box>
                    <Box fontSize="h5.fontSize" lineHeight={1}><b>{`Orden #${idord}`}</b></Box>
                </Box>
            }

            <DialogContent className={classes.dialogContent}>
                <Box px={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1">
                                {"Informacíon de Envio"}
                            </Typography>
                            <ClientCard data={selectedClient} viewOnly/>
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <Typography variant="subtitle1">
                                Forma de Pago: 
                                <Box color="primary.main" fontWeight="normal" component="span" px={1}>
                                    {payment.method === 'creditcard'? "Tarjeta": "Efectivo"}
                                </Box>
                            </Typography>
                            {payment.method === 'creditcard'?
                                <CreditCardCard data={payment.details} viewOnly/>
                            :
                                <Box borderColor="grey.300" border={1} borderRadius={5} px={2} pb={3}><Efective/></Box>
                            }
                        </Grid>
                    </Grid>
                </Box>
                <Box px={2} pt={2}>
                    <Typography variant="subtitle1">
                        {"Productos"}
                    </Typography>                    
                </Box>
                <Cart products={products} viewOnly/>
            </DialogContent>

            <DialogActions className={classes.dialogActions}>
                <Box display="flex" flexDirection="column" flex="1">
                    <Box display="flex" flex="1" mx={2} borderTop={1} borderColor="grey.300" fontSize="h6.fontSize" alignItems="center" color="primary.main">
                        <Box textAlign="left" flex="1" pl={0} >{"Cargo por envío:"}</Box>
                        <Box textAlign="right" flex="1" pr={0} fontSize="1.25rem"  fontWeight="bold">${process.env.API_CARGO_ENVIO}</Box>
                    </Box>
                    <Box display="flex" flex="1" mx={2} pb={1} fontSize="h5.fontSize" fontWeight="bold" alignItems="center">
                        <Box textAlign="left" flex="1" pl={0} >{"Total:"}</Box>
                        <Box textAlign="right" flex="1" pr={0} fontSize="1.85rem" color="secondary.main">${Number(totalPrice) + Number(process.env.API_CARGO_ENVIO || 0)}</Box>
                    </Box>
                    {!paid? 
                        <Button
                            color="secondary"
                            variant="contained"
                            disableElevation
                            className={classes.button}
                            startIcon={<ShopIcon style={{fontSize: "1em"}} />}
                            onClick={handleClickShopping}
                        >
                            Comprar
                        </Button>
                    :
                        <Button
                            color="primary"
                            variant="contained"
                            disableElevation
                            className={classes.button}
                            onClick={handleClose}
                        >
                            Continuar Comprando
                        </Button>                    
                    }
                </Box>
            </DialogActions>
            
            <Loading loading={cargando}/>
        {/* </>} */}
        </Dialog>
    );
}
