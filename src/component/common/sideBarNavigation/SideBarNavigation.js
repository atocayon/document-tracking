import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

export default function SideBarNavigation(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemComponent primary="Home" />
          <ListItem button onClick={props.handleClick}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={"Documents"} />
            {props.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={props.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemComponent primary="Pending" className={classes.nested} />

              <ListItemComponent
                primary="My Documents"
                className={classes.nested}
              />

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
          <ListItemComponent primary="Internal Tracking" />
        </List>
      </div>
    </>
  );
}
