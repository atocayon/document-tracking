import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { getFromStorage } from "../../storage";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import io from "socket.io-client";
import endPoint from "../../endPoint";
import InfoIcon from "@material-ui/icons/Info";
import { fetchActiveUserList } from "../../../redux/actions/fetchActiveUserList";
let socket;
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

function UserList(props) {
  useEffect(() => {
    socket = io(endPoint.ADDRESS);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      async function fetch() {
        await props.fetchActiveUserList(token, socket);
      }

      fetch().catch((err) => {
        throw err;
      });
    }
  }, []);

  return (
    <div>
      {props.userList.length > 0 && (
        <h6
          style={{
            paddingTop: 100,
            paddingLeft: 20,
            paddingBottom: 30,
            fontWeight: "bold",
            color: "#2196F3",
            borderBottom: "1px solid #E9ECEF",
          }}
        >
          <InfoIcon />
          &nbsp;Active Users
        </h6>
      )}

      {props.userList.length > 0 && (
        <List>
          {props.userList.map((data, index) => (
            <ListItem alignItems="flex-start" key={data.user_id}>
              <ListItemAvatar>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar alt={data.name} src="/static/images/avatar/1.jpg" />
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
          ))}
        </List>
      )}

      {props.userList.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "40vh", color: "#9E9E9E" }}>
          <small>No other active user(s)</small>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userList: state.fetchActiveUserList,
  };
}

const mapDispatchToProps = {
  fetchActiveUserList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(UserList));
