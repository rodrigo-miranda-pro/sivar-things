import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider, IconButton, Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import clsx  from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

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
    },
    nameSelected:{
        color: theme.palette.primary.main,
    },
    email:{textAlign: "center"},
    number:{textAlign: "center"},
    direction:{textAlign: "center"},
}));
export default function (props) {
    const classes = useStyles();
    const { data, onClickEdit, onClickDelete, onSelection, viewOnly } = props;
    const handlerClickEdit = () =>{
        onClickEdit && onClickEdit(data, true)
    }
    const handlerClickDelete = () =>{
        onClickDelete && onClickDelete(data)
    }
    const handlerClickSelection = () =>{
        onSelection && onSelection(data)
    }
    return (
        <>
            {data && 
                <Card className={clsx(classes.root, {[classes.selected]: data.selected}) } elevation={0}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6" component="h2" color={data.selected?"primary":"inherit"} className={clsx(classes.name, {[classes.nameSelected]: data.selected})}>
                            {data.name}
                        </Typography>
                        <Divider/>
                        <Box p={1}>
                            <Typography color="textSecondary" className={classes.email}>
                                {data.email}
                            </Typography>
                            <Typography color="textSecondary" className={classes.number}>
                                {data.phonenumber}
                            </Typography>
                            <Typography variant="subtitle2" className={classes.direction}>
                                {data.direction}
                            </Typography>
                        </Box>
                    </CardContent>
                    {!viewOnly &&
                        <CardActions disableSpacing>
                            <IconButton variant="text" onClick={handlerClickDelete} color={data.selected?"primary":"inherit"} onClick={handlerClickSelection}>
                                {data.selected && <CheckBoxIcon/> }
                                {!data.selected && <CheckBoxOutlineBlankIcon/> }
                            </IconButton>
                            <div style={{flexGrow: 1}}></div>
                            <Button variant="text" onClick={handlerClickDelete}>
                                <DeleteIcon></DeleteIcon>
                            </Button>
                                <Button type="submit" variant={data.selected?"contained":"text"} color={data.selected?"primary":"inherit"} disableElevation onClick={handlerClickEdit}>
                                    <EditIcon ></EditIcon>
                                </Button>
                        </CardActions>
                    }
                </Card>
            }
        </>
    );
}
