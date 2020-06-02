import React from "react";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { getFromStorage } from "../../storage";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Reactotron from "reactotron-react-js";
import Divider from "@material-ui/core/Divider";

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

export default function UserList(props) {
  let filteredData;
  const obj = getFromStorage("documentTracking");
  if (obj && obj.token) {
    filteredData = props.user.filter(
      (data) => data.user_id !== obj.token.toString()
    );
  }

  return (
    <List style={{marginTop: 100}}>
      {filteredData &&
        filteredData.map((data, index) => (
          <>
            <ListItem alignItems="flex-start" key={index}>
              <ListItemAvatar>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar alt={data.name} />
                </StyledBadge>
              </ListItemAvatar>
              <ListItemText
                primary={data.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                    >
                      {data.position}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))}
    </List>
  );
}
