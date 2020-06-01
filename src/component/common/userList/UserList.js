import React from "react";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { getFromStorage } from "../../storage";

export default function UserList(props) {
  const obj = getFromStorage("documentTracking");

  let _users = props.user.filter((data) => data.user_id !== obj.token);
  return (
    <List>
      {_users.map((users) => {
        return (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={users.name} />
            </ListItemAvatar>
            <ListItemText
              primary={users.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    // className={classes.inline}
                    style={{ color: "#4caf50" }}
                  >
                    Active now
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
