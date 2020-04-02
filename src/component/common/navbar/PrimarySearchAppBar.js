import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Drawer from "@material-ui/core/Drawer";
import logo from "../../../img/logo.png";

//Include
import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";
import MobileMenu from "./RenderMobileMenu";
import ProfileMenu from "./ProfileMenu";
import {getFromStorage} from "../../storage";

export default function PrimarySearchAppBar(props) {
  const classes = useStyles(); // css styles

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  }); //Used for Drawer

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const isMenuOpen = Boolean(anchorEl);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const profileMenu = (
    <ProfileMenu
      anchorElProfileMenu={anchorEl}
      anchorOriginProfileMenu={{ vertical: "top", horizontal: "right" }}
      idProfileMenu={menuId}
      transformOriginProfileMenu={{ vertical: "top", horizontal: "right" }}
      openProfileMenu={isMenuOpen}
      onCloseProfileMenu={handleMenuClose}
    />
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <MobileMenu
      mobileMoreAnchorEl={mobileMoreAnchorEl}
      anchorOriginMobileMenu={{ vertical: "top", horizontal: "right" }}
      idMobileMenu={mobileMenuId}
      transformOriginMobileMenu={{ vertical: "top", horizontal: "right" }}
      openMobileMenu={isMobileMenuOpen}
      onCloseMobileMenu={handleMobileMenuClose}
      handleProfileMenuOpenMobileMenu={handleProfileMenuOpen}
      handleMenuCloseProfileMenu={handleMenuClose}
    />
  );

  const leftSideList = side => (
    <LeftDrawer
        // section={props.user.data.section}
      nameLeftDrawer={classes.list}
      leftDrawerRole={"presentation"}
      onClickFunctionLeftDrawer={toggleDrawer(side, false)}
      onKeyDownFunctionLeftDrawer={toggleDrawer(side, false)}
    />
  );

  const rightSideList = side => (
    <RightDrawer
      nameRightDrawer={classes.list}
      rightDrawerRole={"presentation"}
      onClickRightDrawer={toggleDrawer(side, false)}
      onKeyDownRightDrawer={toggleDrawer(side, false)}
    />
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "#fafafa",
            color: "#263238",
            width: "100%",
            marginTop: "1vh"
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
            >
            <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <img src={logo} alt={"nmp"} style={{ width: "1.7vw" }} />  | <b>Document Tracking System</b>
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={toggleDrawer("right", true)}
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
        {profileMenu}

        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
          {leftSideList("left")}
        </Drawer>

        <Drawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer("right", false)}
        >
          {rightSideList("right")}
        </Drawer>
      </div>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(3)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },

  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));
