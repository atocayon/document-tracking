import React, { useEffect, useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
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
import { getFromStorage } from "../../storage";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import io from "socket.io-client";
import Badge from "@material-ui/core/Badge";
import Reactotron from "reactotron-react-js";
let socket;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "none",
    width: "100%",
    height: "100vh",
    overflow: "auto",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: 50,
    paddingBottom: 100,
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default function SideBarNavigation(props) {
  const classes = useStyles();
  const [pending, setPending] = useState(props.pending);
  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      socket.emit("total_pending_doc", obj.token);
      socket.on("total_pendings", (data) => {
        setPending(data);
      });
    }
    Reactotron.log(pending);
    Reactotron.log("pending");

    if (props.pending !== null) {
      setPending(props.pending);
    }
  }, []);

  return (
    <div className={"sidebar"}>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {props.user ? (
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <ListItem
                className={"start"}
                title={"Click to go to home page"}
                style={{ paddingTop: 70, paddingBottom: 30, color: "#2196F3" }}
              >
                <ListItemAvatar>
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
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
              <ListItem
                style={{ paddingTop: 50, paddingBottom: 20, color: "#2196F3" }}
              >
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
              <div className={"sidebarNew"}>
                <ListItemComponent primary="New" className={classes.nested} />
              </div>

              {/*<ListItemComponent primary="Drafts" className={classes.nested} />*/}
              <div className={"sidebarPending"}>
                <ListItemComponent
                  primary="Pending"
                  className={classes.nested}
                  pending={pending}
                />
              </div>

              <div className={"sidebarSectionDoc"}>
                <ListItemComponent
                  section={props.user.secshort}
                  primary={props.user.secshort + " Documents"}
                  className={classes.nested}
                />
              </div>

              <div className={"sidebarProcessedDoc"}>
                <ListItemComponent
                  primary="Received/Released"
                  className={classes.nested}
                />
              </div>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <div className={"sidebarManageDocCat"}>
            <ListItemComponent primary="Manage Document Category" />
          </div>
        </List>
        <List component="nav" aria-label="secondary mailbox folders">
          <div className={"sidebarUserManage"}>
            <ListItemComponent primary="User Management" />
          </div>
        </List>

        {/*<List component="nav" aria-label="secondary mailbox folders">*/}
        {/*  <ListItemComponent primary="Generate Reports" />*/}
        {/*</List>*/}

        {/*<List component="nav" aria-label="secondary mailbox folders">*/}
        {/*  <ListItemComponent primary="About" />*/}
        {/*</List>*/}
      </div>
    </div>
  );
}
