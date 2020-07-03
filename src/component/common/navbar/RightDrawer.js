import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DescriptionIcon from "@material-ui/icons/Description";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function RightDrawer(props) {
  const classes = useStyles();
  return (
    <div
      className={props.nameRightDrawer}
      role={props.rightDrawerRole}
      onClick={props.onClickRightDrawer}
      onKeydown={props.onKeyDownRightDrawer}
    >
      <List className={classes.root}>
        {props.notification.map(data => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                  <Avatar>
                      <DescriptionIcon />
                  </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={data.subject}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {data.doc_type}
                    </Typography>
                    {" - "+data.creator}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </div>
  );
}
