import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from "components/cart";
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, SummaryContent } from "components/checkout/ExpansionPanel";
import ClientInfo from "components/clients";
import Payment from "components/payments";
import React from "react";
import viewController from "src/hocs/viewController";
import ConfirmPayDialog from "./ConfirmPayDialog";
import controller from "./controller";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        width: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
    },
    btnCheckout:{
        fontSize: '1.5em',
        textTransform: 'capitalize',
        letterSpacing: '0.5px',
        flex: 1
    }
}));

const Checkout = function (props) {
    const classes = useStyles();
    const {
        updateClientList,
        handlerDeleteProductCart,
        updatePaymentMethod,
        dispatchResetCheckout,
        expanded,
        dispatchUpdateExpanded,
        dispatchSendTicketEmail,
        checkout,
        checkout:{
            cart,
            shipping,
            payment
        }
    } = props;
    const [open, setOpen] = React.useState(false);
    const [expand, setExpand] = React.useState(expanded?expanded:"cart");

    React.useEffect(()=>{
        setExpand(_.isNil(expanded)?"cart":expanded);
    }, [expanded])

    const handleChange = (panel) => (event, newExpanded) => {
        setExpand(panel);
        dispatchUpdateExpanded && dispatchUpdateExpanded(panel)
    };

    const handleClickConfirmPay = (prd) => {
        setOpen(true);
    };

    const handleClose = (paid) => {
        setOpen(false);
        if(paid) dispatchResetCheckout();
    };

    return (
        <>
            <div className={classes.root}>
                <ExpansionPanel square expanded={expand === 'cart'} onChange={handleChange('cart')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        <SummaryContent
                            title="Orden"
                            avatarIcon={<ShoppingCartIcon />}
                            success={cart.success}
                        >
                            {cart.success && `${cart.totalProducts} Productos`}
                        </SummaryContent>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Cart products={cart.products} onDelete={handlerDeleteProductCart}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel square expanded={expand === 'client'} onChange={handleChange('client')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        <SummaryContent
                            title="Datos de Envio"
                            avatarIcon={<PersonIcon />}
                            success={shipping.success}
                        >
                            {shipping.success && <span><b>{shipping.selectedClient.name}</b> | {shipping.selectedClient.direction}</span>}
                        </SummaryContent>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ClientInfo clients={shipping.clients} updateClients={updateClientList} selectedClient={shipping.selectedClient} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel square expanded={expand === 'payment'} onChange={handleChange('payment')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        <SummaryContent
                            title="Información de Pago"
                            avatarIcon={<CreditCardIcon />}
                            statusIcon={<ErrorOutlineIcon />}
                            success={payment.success}
                        >
                            {payment.success && (payment.method === "efective"? "Efectivo": "Tarjeta")}
                        </SummaryContent>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails> 
                        <Payment payment={payment} updatePayment={updatePaymentMethod}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Box display="flex" p={1}>
                    <Button className={classes.btnCheckout} variant="contained" color="secondary" disableElevation 
                        disabled={!cart.success || !shipping.success || !payment.success}
                        onClick={handleClickConfirmPay}
                    >
                        Confirmar Compra
                    </Button>
                </Box>
            </div>
        
            <ConfirmPayDialog checkout={checkout} open={open} onClose={handleClose} onShopping={dispatchSendTicketEmail}/>
        </>
    );
}

export default viewController(Checkout, controller);
