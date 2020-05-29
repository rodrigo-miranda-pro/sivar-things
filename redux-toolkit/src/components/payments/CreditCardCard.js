import { Box, Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from "react";

const useStyles = makeStyles((theme)=>({
    root:{
        border: "none",
        width: "100%",
        border: '1px solid #e0e0e0',
    },
    cardContent: {
        padding: "0px !important",
    },
    name:{
        textAlign: "center",
        position: "relative",
        color: theme.palette.primary.main,
    },
}));
export default function (props) {
    const classes = useStyles();
    const { data, onClickEdit, onClickDelete, viewOnly } = props;

    const handlerClickEdit = () =>{
        onClickEdit(data, true)
    }
    const handlerClickDelete = () =>{
        onClickDelete(data)
    }
    return (
        <Card className={classes.root} elevation={0}>
            <CardContent className={classes.cardContent}>
                <Typography variant="h6" component="h2" className={classes.name}>
                    {data.name}
                </Typography>
                <Divider/>
                <Box display="flex" p={2}>
                    <Box flex="1">
                        <Typography variant="body2" component="h2">
                            {"Número de tarjeta"}
                        </Typography>
                        <Typography variant="h6" component="h2" noWrap>
                            {data.cardnumber.split("").map((o,i)=>(i < (data.cardnumber.length - 4) && o !==" "?"*":o ))}
                        </Typography>
                    </Box>
                    <Box flex="1" pl={2}>
                        <Typography variant="body2" component="h2">
                            {"Fecha de expiración"}
                        </Typography>
                        <Typography color="textSecondary">
                            {`${data.month} / ${data.year}`}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            {!viewOnly &&
                <CardActions disableSpacing>
                    <Box flexGrow="1"/>
                    <Button variant="text" onClick={handlerClickDelete}>
                        <DeleteIcon/>
                    </Button>
                    <Button type="submit" variant={"contained"} color={"primary"} disableElevation onClick={handlerClickEdit}>
                        <EditIcon/>
                    </Button>
                </CardActions>
            }
        </Card>
    );
}
