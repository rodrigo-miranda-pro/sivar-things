import { makeStyles } from "@material-ui/core/styles";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CreditCard from "components/payments/CreditCard";
import React, {useEffect} from "react";
import Efective from "./Efective";

const useStyles = makeStyles(theme => ({
    toogleButtons:{
        display: "flex",
        alignItems: "center",
        margin: theme.spacing(3,2,0,2),
        "& button":{
            flex:1,
            color: "black",
            letterSpacing: "1px",
            textTransform: "initial",
            fontSize: "1.25em"
        },
        "& button.Mui-selected, & button.Mui-selected:hover":{
            background: theme.palette.primary.main,
            color: "white",
            fontSize: "1.5em"
        }
    },
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
}))

export default (props) => {
    const classes = useStyles();
    const {
        payment,
        updatePayment
    } = props;
    const [paymentType, setPaymentType] = React.useState(payment?payment.method:null);

    useEffect(()=>{
        setPaymentType(payment?payment.method:null);
    }, [payment])

    const handleAlignment = (event, newPayment) => {
        setPaymentType(newPayment);
        updatePayment && updatePayment({method: newPayment})
    };

    const setCreditCardData = (data) =>{
        updatePayment && updatePayment({
            method: paymentType,
            details: data
        })
    }

    return (
        <>
            <ToggleButtonGroup
                value={paymentType}
                exclusive
                onChange={handleAlignment}
                className={classes.toogleButtons}
            >
                <ToggleButton value="efective" >
                    <LocalAtmIcon /> &nbsp; Efectivo
                </ToggleButton>
                <ToggleButton value="creditcard">
                    <CreditCardIcon /> &nbsp; Tarjeta
                </ToggleButton>
            </ToggleButtonGroup>
            {paymentType === 'efective' && <Efective/>}
            {paymentType === 'creditcard' && <CreditCard setCreditCardData={setCreditCardData}/>}
            
        </>
    );
};
