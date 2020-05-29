import { Avatar, Box } from "@material-ui/core";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckIcon from '@material-ui/icons/Check';
import clsx from "clsx";
import React from "react";

const heightHeaderSummary = 60;

export const ExpansionPanel = withStyles({
    root: {
        // border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
        // borderBottom: "1px solid rgba(0, 0, 0, .125)",
        "&:not(:last-child)": {
            borderBottom: 0,
        },
        "&:before": {
            display: "none",
        },
        "&$expanded": {
            // margin: "auto",
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        "&$expanded>div:last-child": {
            overflowY: 'auto',
            flex: '1 1 0',                      
        }
    },
    expanded: {
        margin: "0 !important"
    },

})(MuiExpansionPanel);

export const SummaryContent = function (props) {
    return (
        <div className="contentSummary">
            <div className="avatar">
                <Avatar className={clsx({["success"]: props.success})}>{props.avatarIcon}</Avatar>
            </div>
            <div className="summaryText">
                <Typography className="title">{props.title}</Typography>
                <Box className="subSummaryText" textOverflow="ellipsis">
                    {props.children && props.children}
                </Box>
            </div>
            {props.success && <CheckIcon className="statusCheck"/>}
        </div>
    );
};

export const ExpansionPanelSummary = withStyles((theme) => ({
    root: {
        // backgroundColor: "rgba(0, 0, 0, .03)",
        // borderBottom: "1px solid rgba(0, 0, 0, .125)",
        marginBottom: -1,
        height: heightHeaderSummary,
        overflow: "hidden",
        padding: theme.spacing(0, 1),
        "&$expanded": {
            height: heightHeaderSummary,
        },
    },
    content: {
        display: "block",
        "& .contentSummary": {
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
        },
        "& .avatar": {
            padding: theme.spacing(0, 1),
        },
        "& .MuiAvatar-root.success": {
            background: theme.palette.primary.main
        },
        "& .summaryText": {
            display: "flex",
            flexDirection: "column",
            flex: 1,
        },
        "& .subSummaryText": {
            color: "#999",
            whiteSpace: 'nowrap',
            overflow: 'hidden',            
            width: 'calc(100vw - 140px)',
            [theme.breakpoints.up(959)]:{
                width: '260px',
            }
        },  
        "& .statusCheck": {color: "#4CAF50"},
        "& .title": {
            fontSize: "1.5em",
        },
        "&$expanded": {
            margin: 0,
        },
    },
    expanded: {},
}))(MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        // height: `calc(100vh - ${(heightHeaderSummary * 5)+20}px)`,
        overflow: "auto",
        flexDirection: "column"
    },
}))(MuiExpansionPanelDetails);

