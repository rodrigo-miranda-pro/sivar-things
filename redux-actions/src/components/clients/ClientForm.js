import { Button, CardActions, IconButton, TextField } from "@material-ui/core";
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
    email: "Ingresa un correo electronico valido"
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

export default function (props){
    const classes = useStyles();
    const {
        onSubmitClientForm,
        onClickBack,
        showBack,
        data
    } = props;
    const formik = useFormik({
        initialValues: {
            idcli: undefined,
            name: "",
            phonenumber: "",
            email: "",
            direction: "",
            ...data
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(msg.required),
            phonenumber: Yup.string().required(msg.required),
            email: Yup.string().email(msg.email).required(msg.required),
            direction: Yup.string().required(msg.required),
        }),
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            if (onSubmitClientForm) onSubmitClientForm(values);
        },
    });    
    const formikProps = formikUtil(formik).formikProps;
    const handleBackClick = () => {
        onClickBack()
    }
    return (
        <form className={classes.root} onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <input type="hidden" name="idcli"/>
            <TextField {...formikProps('name', "Nombre y Apellido")} variant="outlined" fullWidth/>
            <MaskedInput
                {...formikProps('phonenumber', "Telefono")}
                mask={[ /[2,5,6,7,8]/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, ]}
                guide={false}
                render={(ref, props) => (
                    <TextField  inputRef={ref} {...props} variant="outlined" fullWidth/>
                )}
            />
            <TextField {...formikProps('email',"Correo Electronico")} type="email" variant="outlined" fullWidth/>
            <TextField {...formikProps('direction', "Dirección")} variant="outlined" fullWidth/>
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

