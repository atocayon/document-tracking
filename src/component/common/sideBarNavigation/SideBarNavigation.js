import React, { useEffect, useState } from "react";
import {makeStyles, useTheme, withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemComponent from "./ListItemComponent";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import axios from "axios";
import { getFromStorage } from "../../storage";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import io from "socket.io-client";
import endPoint from "../../endPoint";
import Badge from "@material-ui/core/Badge";
let socket;
const useStyles = makeStyles(theme => ({
  root: {
    display: "none",
    width: "100%",
    height: "100vh",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: 50,
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "block"
    }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);


export default function SideBarNavigation(props) {
  const classes = useStyles();
  const [pending, setPending] = useState(null);
  useEffect(() => {
    socket = io(endPoint.ADDRESS);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token){
      socket.emit("countPending", obj.token);
      socket.on("pendings", data => {
        setPending(data);
      });
    }

  }, [pending, socket]);

  return (
    <>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {props.user ? (
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <ListItem
                style={{ paddingTop: 70, paddingBottom: 30, color: "#2196F3" }}
              >
                <ListItemAvatar>
                  <StyledBadge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot"
                  >
                    <Avatar
                        alt={props.user.name}
                        src="/static/images/avatar/1.jpg"
                    />
                  </StyledBadge>

                </ListItemAvatar>
                <ListItemText
                  primary={props.user.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {props.user.position}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>

            </Link>
          ) : (
              <Link to={"/"}>
                <ListItem style={{ paddingTop: 50, paddingBottom: 20, color: "#2196F3" }}>
                  <ListItemIcon>
                    <ArrowBackIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <b>Home</b>
                  </ListItemText>

                </ListItem>
              </Link>


          )}
          <Divider />
          <ListItem button onClick={props.handleClick}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={"Documents"} />
            {props.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={props.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemComponent primary="New" className={classes.nested} />
              <ListItemComponent primary="Drafts" className={classes.nested} />
              <ListItemComponent primary="Pending" className={classes.nested} pending={pending} />

              {/*<ListItemComponent*/}
              {/*  primary="My Documents"*/}
              {/*  className={classes.nested}*/}
              {/*/>*/}

              <ListItemComponent
                primary="Section Documents"
                className={classes.nested}
              />

              <ListItemComponent
                primary="Received/Released"
                className={classes.nested}
              />
            </List>
          </Collapse>
        </List>
        <Divider />

        <List component="nav" aria-label="secondary mailbox folders">
          <ListItemComponent primary="User Management" />
        </List>

        <List component="nav" aria-label="secondary mailbox folders">
          <ListItemComponent primary="Generate Reports" />
        </List>

        <List component="nav" aria-label="secondary mailbox folders">
          <ListItemComponent primary="About" />
        </List>
      </div>
    </>
  );
}
