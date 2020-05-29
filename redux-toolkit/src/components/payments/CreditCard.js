import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import CreditCardForm from 'components/payments/CreditCardForm';
import CreditCardCard from 'components/payments/CreditCardCard';
import { List, ListItem, Fab, CardActions, Box } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    root:{
    },
    clientList:{
        width: "100%"
    },
    actions:{
        display: 'flex',
        padding: '8px',
        flex: '1',
        alignItems: 'flex-end',
        position: 'sticky',
        bottom: '0px',    
        background: 'white',
    },
    fab:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',  
        "& button":{boxShadow: "none"}
    }
}))

export default function (props){
    const classes = useStyles();
    const [data, setData] = React.useState({});
    const [showForm, setShowForm] = React.useState(true);
    const [showBack, setShowBack] = React.useState(false);
    const {
        setCreditCardData
    } = props;

    const handlerSubmitForm = (data) =>{
        setData(data);
        setShowForm(false);
        setCreditCardData && setCreditCardData(data);
    }
    const handlerClickEdit = (data) =>{
        setData(data);
        setShowForm(true);
        setShowBack(true);
        setCreditCardData && setCreditCardData(data);
    }
    const handlerClickDelete = (data) =>{
        setData({});
        setShowForm(true);
        setShowBack(false);
        setCreditCardData && setCreditCardData({});
    }

    const handleBackClick = () =>{
        setShowForm(false);  
    }

    return (
        <>
            {showForm && <CreditCardForm onSubmitForm={handlerSubmitForm} data={data} onClickBack={handleBackClick} showBack={showBack}/> }
            {!showForm && <Box p={2}><CreditCardCard data={data} onClickEdit={handlerClickEdit} onClickDelete={handlerClickDelete}/></Box>}
        </>
    )
}
