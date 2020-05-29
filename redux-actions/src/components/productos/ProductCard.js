import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { connect } from "react-redux";
import Img from "gatsby-image";

const useStyles = makeStyles((theme)=>({
    root: {
        maxWidth: 345,
        boxShadow:
            "linear-gradient(to bottom, rgba(255,255,255,1) 10%,rgba(125,185,232,0) 60%) #f5f5f5",
        borderRadius: 0,
        margin: "auto"
    },
    media: {
        height: 140,
    },
    cardContent: {
        padding: 0,
        textAlign: "center",
    },
    productName: {
        fontWeight: "bold",
        margin: 0,
    },
    price: {
        color: theme.palette.secondary.main
    },
    imageCard: {
        width: "100%",
    },
}));
export default function (props) {
    const classes = useStyles();
    const { data, images, onClick, onLoadGatsbyImg } = props;

    const onClickCard = () => {
        onClick(data);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={onClickCard}>
                <CardContent className={classes.cardContent}>
                    {data.imageFluid && <Img fluid={data.imageFluid} 
                        style={{ height: 300, }}
                        imgStyle={{  objectFit:"contain" }}
                        onLoad={onLoadGatsbyImg && onLoadGatsbyImg()}                    
                    />}
                    <Typography
                        gutterBottom
                        variant="h6"
                        className={classes.productName}
                    >
                        {data.nombre}
                    </Typography>
                    <Typography gutterBottom>{data.descripcion}</Typography>
                    <Typography
                        gutterBottom
                        variant="h4"
                        className={classes.price}
                    >
                        ${data.precio}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
