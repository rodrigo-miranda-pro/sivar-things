import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import Checkout from "components/checkout";
import CartButton from "components/layout/CartButton";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import MenuButton from "components/layout/MenuButton";
import _ from 'lodash';
import React from "react";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width: "100%",
    },
    drawer: {
        [theme.breakpoints.up("md")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    // necessary for content to be below app bar
    drawerPaper: {
        width: drawerWidth,
        border: "none"
    },
    drawerPaperMobile: {
        width: "100%",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        justifyContent: "flex-start",
        width: "100%",
        position: 'sticky',
        top: '0',
        zIndex: '1',
        background: '#ffffff',
        ...theme.mixins.toolbar,
    },

    hide: {
        display: "none !important",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    checkoutContent:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        overflow: "hidden"
    },
    checkoutContentBody:{
        flex: 1,
        borderLeft: "1px solid #ddd",
    },
}));

const Layout = function (props) {
    const classes = useStyles();
    const theme = useTheme();
    const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
    const [navOpen, setNavOpen] = React.useState(true);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {
        showCheckoutMobile,
        setGlobalState,
        hideRightDrawer,
    } = props;

    React.useEffect(()=>{
        setMobileOpen(_.isNil(showCheckoutMobile)?mobileOpen:showCheckoutMobile);
    }, [showCheckoutMobile])

    const handleDrawerToggle = () => {
        setMobileOpen(!isUpMd && !mobileOpen);
        setGlobalState && setGlobalState({showCheckoutMobile: !isUpMd && !mobileOpen})
        // setNavOpen(isUpMd && !navOpen);
    };

    const ActionsHeader = (
        <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerToggle} className={clsx((isUpMd || (!isUpMd && !mobileOpen)) && classes.hide)}>
                {theme.direction === "rtl" ? (
                    <ChevronLeftIcon />
                ) : (
                    <ChevronRightIcon />
                )}
            </IconButton>
            <Box flexGrow={1}/>
            <CartButton onClick={handleDrawerToggle} />
            <MenuButton/>
        </div>
    );

    const RightDrawerContent = (
        <div className={classes.checkoutContent}>
            {ActionsHeader}
            <Checkout/>
        </div>
    );

    const RightDrawer = (
        <nav className={classes.drawer}>
            {/* Cuando es Mobile Mostrar*/}
            <Hidden mdUp >
                <Drawer
                    // className={clsx(isUpMd && mobileOpen && classes.hide)}                
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaperMobile,
                    }}
                    ModalProps={{keepMounted: true, }}
                >
                    {RightDrawerContent}
                </Drawer>
            </Hidden>

            {/* Cuando es Desktop Mostrar*/}
            <Hidden smDown >
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    anchor="right"
                    open={navOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {RightDrawerContent}
                </Drawer>
            </Hidden>
        </nav>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header>
                <Box flexGrow={1}/>
                {ActionsHeader}                
            </Header>
            <div className={classes.root}>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: navOpen && isUpMd,
                    })}
                >
                    <Toolbar />
                    {props.children}
                    <Footer/>
                </main>
                {!hideRightDrawer && RightDrawer}
            </div>
        </div>
    );
}

export default Layout; 

