import { Box, Button, CardActions, IconButton, TextField } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckIcon from '@material-ui/icons/Check';
import ReplayIcon from '@material-ui/icons/Replay';
import { useFormik } from 'formik';
import React from "react";
import MaskedInput from 'react-text-mask';
import { formikUtil } from 'src/utils';
import * as Yup from 'yup';

const msg ={
    required: "Este campo es requerido",
}
const useStyles = makeStyles(theme => ({
    root:{
        padding: theme.spacing(1, 2),
        width: "100%",
        "& .MuiFormControl-root":{
            margin: theme.spacing(1, 0),
        }
    }
}))

const Combo = (props) =>{
    return (
        <FormControl variant="outlined">
            <InputLabel>{props.label}</InputLabel>
            <Select
                inputProps={{
                    name: props.name
                }}
                value={props.value}
                onChange={props.onChange}
                label={props.label}
            >
                {props.options && props.options.map(
                    o => <MenuItem key={"opt-"+o} value={o}>{o}</MenuItem>
                )}
            </Select>
        </FormControl>
    );    
}

export default (props) => {
    const classes = useStyles();
    const {
        onSubmitForm,
        onClickBack,
        showBack,
        data
    } = props;
    const formik = useFormik({
        initialValues: {
            name: "",
            cardnumber: "",
            month: "",
            year: "",
            cvv2: "",
            ...data
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(msg.required),
            cardnumber: Yup.string().required(msg.required).length(25, "Número de tarjeta invalido"),
            month: Yup.string().required(msg.required),
            year: Yup.string().required(msg.required),
            cvv2: Yup.string().required(msg.required),
        }),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            if (onSubmitForm) onSubmitForm(values);
        },
    });    
    const formikProps = formikUtil(formik).formikProps;
    const handleBackClick = () => {
        onClickBack()
    }
    return (
        <form className={classes.root} onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <TextField {...formikProps('name', "Titular")} variant="outlined" fullWidth/>
            <MaskedInput {...formikProps('cardnumber', "Número de Tarjeta")} 
                mask={[ /\d/, /\d/, /\d/, /\d/, " ", " ", " ", /\d/, /\d/, /\d/, /\d/, " ", " ", " ",  /\d/, /\d/, /\d/, /\d/, " ", " ", " ", /\d/, /\d/, /\d/, /\d/ ]} guide={false}
                render={(ref, props) => (
                    <TextField  inputRef={ref} {...props} variant="outlined" fullWidth/>
                )}
            />
            <Box display="flex">
                <Box marginRight={1}>
                    <Combo {...formikProps('month', "Mes ")}
                        options={[...Array(12).keys()].map(i=> i+1)}
                    />
                </Box>
                <Box>
                    <Combo {...formikProps('year', "Año ")}
                        options={[...Array(15).keys()].map(i=>new Date().getFullYear() + i)}
                    />
                </Box>
                <Box flexGrow="1"/>
                <Box flex="1" display="flex" alignItems="end">
                    <MaskedInput {...formikProps('cvv2', "CVV2")} mask={[ /\d/, /\d/, /\d/, /\d/]} guide={false}
                        render={(ref, props) => (
                            <TextField  inputRef={ref} {...props} variant="outlined"/>
                        )}
                    />                        
                </Box>
            </Box>
            <CardActions disableSpacing>
                {showBack &&
                    <IconButton variant="text" onClick={handleBackClick}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                }
                <div style={{flexGrow: 1}}></div>
                <Button variant="text" onClick={formik.resetForm}>
                    <ReplayIcon />
                </Button>
                <Button type="submit" variant="contained" disabled={!formik.isValid} color="primary" disableElevation>
                    <CheckIcon />
                </Button>
            </CardActions>
        </form>
    );
};
