import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import ListItemComponent from "../sideBarNavigation/ListItemComponent";
import BuildIcon from "@material-ui/icons/Build";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PrintIcon from "@material-ui/icons/Print";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import io from "socket.io-client";
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

export default function LeftDrawer(props) {
  const classes = useStyles();

  return (
    <div
      className={props.nameLeftDrawer}
      role={props.leftDrawerRole}
      onClick={props.onClickFunctionLeftDrawer}
      onKeydown={props.onKeyDownFunctionLeftDrawer}
    >
      <List>
        {["Home", "Documents"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? <HomeIcon /> : <DescriptionIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List component="div" disablePadding>
        <div className={"sidebarNew"}>
          <ListItemComponent primary="New" className={classes.nested} />
        </div>

        {/*<ListItemComponent primary="Drafts" className={classes.nested} />*/}
        <div className={"sidebarPending"}>
          <ListItemComponent primary="Pending" className={classes.nested} />
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
    </div>
  );
}
