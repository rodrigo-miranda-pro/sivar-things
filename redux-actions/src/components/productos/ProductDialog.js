import { Chip, Divider, DialogActions, DialogContent, Box } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import Img from "gatsby-image";
import React from "react";

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        padding: theme.spacing(0),
    },
    backdrop: {
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "grayscale(1) blur(2px)",
    },
    avatar: {
        backgroundColor: red[500],
        fontWeight: "bold",
        fontSize: "1.5em",
        padding: 25,
    },
    cardHeader: {
        padding: theme.spacing(2,2,1,2),
    },
    title: {
        fontWeight: "bold",
    },
    dialogActions: {
        padding: theme.spacing(1),
    },
    centerSpacing: {
        margin: theme.spacing(1, 0),
        textAlign: "center",
    },
    opciones: {
        "& > *": {
            margin: theme.spacing(0.5),
            padding: theme.spacing(0, 1),
            fontSize: "1.25em",
        },
    },
    precioButton: {
        fontSize: "2em",
        flex: 1,
        padding: 0,
        lineHeight: "1.5em",
        margin: theme.spacing(0, 1),
    },
}));

export default function (props) {
    const classes = useStyles();
    const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"));
    const { onClose, product, open } = props;
    const [indexSelected, setindexSelected] = React.useState(0);

    const handleClose = () => {
        onClose();
    };

    const addProductCart = () => {
        let itemSelected = {...product};
        if(product.opciones) itemSelected.opcion = Object.entries(product.opciones[indexSelected])[0][1];
        onClose(itemSelected);
    };

    const handleToggle = (e, index) => {
        setindexSelected(index);
    };

    const onEnter = () => {
        setindexSelected(0);
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            onEnter={onEnter}
            onClose={handleClose}
            open={open}
            fullWidth
            scroll="paper"
            BackdropProps={{
                timeout: 0,
                className: classes.backdrop,
            }}
        >
            <CardHeader
                action={
                    <IconButton elvation={0} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                }
                className={classes.cardHeader}
                title={product.nombre}
                subheader={product.categoria}
                titleTypographyProps={{
                    className: classes.title,
                    variant: "h5",
                }}
                subheaderTypographyProps={{ variant: "h6" }}
            />

            <DialogContent className={classes.dialogContent}>
                {product.imageFluid && (
                    <Img
                        fluid={product.imageFluid}
                        objectFit="contain"
                        style={{ minHeight: 300, maxHeight: 500 }}
                        imgStyle={{ objectFit: "contain" }}
                    />
                )}

                {product.descripcion && (
                    <Typography className={classes.centerSpacing}>
                        {product.descripcion}
                    </Typography>
                )}

                {product.opciones && product.opciones.length > 1 && (
                    <>
                        <Typography className={classes.centerSpacing}>
                            <b>
                                {`Selecciona ${
                                    Object.entries(product.opciones[0])[0][0]
                                }`}
                            </b>
                        </Typography>
                        <Box className={classes.opciones} px={2} pb={1}>
                            {product.opciones.map((opcion, index) => (
                                <Chip
                                    key={`option-${index}`}
                                    size="medium"
                                    label={Object.entries(opcion)[0][1]}
                                    color={
                                        index === indexSelected
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={(e) => handleToggle(e, index)}
                                />
                            ))}
                        </Box>
                    </>
                )}
            </DialogContent>

            
            <DialogActions className={classes.dialogActions}>
                <Button
                    color="secondary"
                    variant="contained"
                    disableElevation
                    className={classes.precioButton}
                    endIcon={<AddShoppingCartIcon style={{fontSize: "1em"}} />}
                    onClick={addProductCart}
                >
                    ${product.precio}
                </Button>
            </DialogActions>            
        </Dialog>
    );
}
