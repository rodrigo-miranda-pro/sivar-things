import { Box, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProductCard from "components/productos/ProductCard";
import ProductDialog from "components/productos/ProductDialog";
import Loading from "components/commons/Loading";
import React from "react";
import _ from "lodash"

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "25px 16px",
    },
    categoria: {
        top: '55px',
        width: '100%',
        height: '55px',
        zIndex: '1',
        position: 'sticky',
        backdropFilter: 'grayscale(1)',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up("sm")]: {
            height: "70px",
            top: "64px",
        },
    },
    categoriaName: {
        color: 'white',
        right: '40px',
        zIndex: '1',
        fontSize: '2em',
        fontStyle: 'italic',
        textAlign: 'center',
        display: 'table',
        background: theme.palette.primary.main,
        padding: '0 36px',
        borderRadius: '20px 0px 15px 0px',
        margin: '0 auto',
    },
}));

export default function (props) {
    const classes = useStyles();
    const { productos, addCart } = props;
    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = React.useState(false);
    const totalProds = _.reduce(productos, (result, value, key)=> (result = result + value.length), 0);
    let countImg = 0;

    const onClickCard = (prd) => {
        setOpen(true);
        setProduct(prd);
    };

    const handleClose = (product) => {
        if(product) addCart(product);
        setOpen(false);
    };

    const onLoadGatsbyImg = ()=>{
        countImg = countImg + 1;
    }

    return (
        <>
            <Loading loading={countImg >= totalProds}/>
            {productos &&  Object.keys(productos).map((categoria) => (
                <Box key={`box-${categoria}`}>
                    <Box className={classes.categoria}>
                        <Typography className={classes.categoriaName}>
                            {categoria}
                        </Typography>
                    </Box>
                    <Container className={classes.container}>
                        <Grid container spacing={2}>
                            {productos[categoria].map((prd) => (
                                <Grid key={"card-prd-"+prd.id} item xs={12} sm={6} md={4} lg={3}>
                                    <ProductCard onClick={onClickCard} data={prd} onLoadGatsbyImg={onLoadGatsbyImg}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            ))}
            
            <ProductDialog product={product} open={open} onClose={handleClose}/>
        </>
    );
};
