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
import InfoIcon from "@material-ui/icons/Info";
import { fetchActiveUserList } from "../../../redux/actions/fetchActiveUserList";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "80vh",
    paddingBottom: "10vh",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

function UserList(props) {
  const classes = useStyles();
  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER);
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
    <div class="overflow-auto">
      {props.userList.length > 0 && (
        <h6
          style={{
            paddingTop: "15vh",
            paddingLeft: 10,
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

      <div class="overflow-auto">
        {props.userList.length > 0 && (
          <List className={classes.root} subheader={<li />}>
            {props.userList.map((data, index) => {
              let name = data.name.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) =>
                match.toUpperCase()
              );

              let position = data.position.replace(
                /(^\w{1})|(\s{1}\w{1})/g,
                (match) => match.toUpperCase()
              );

              return (
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
                      <Avatar
                        alt={data.name}
                        src="/static/images/avatar/1.jpg"
                      />
                    </StyledBadge>
                  </ListItemAvatar>
                  <ListItemText
                    MuiListItemText-dense
                    primary={name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          // className={classes.inline}
                        >
                          {position}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              );
            })}

            <ListItem alignItems="flex-start" key={"data.user_id"}>
              <ListItemAvatar>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar alt={"dample"} src="/static/images/avatar/1.jpg" />
                </StyledBadge>
              </ListItemAvatar>
              <ListItemText
                MuiListItemText-dense
                primary={"name"}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                    >
                      "sample"
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>

            <ListItem alignItems="flex-start" key={"data.user_id"}>
              <ListItemAvatar>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar alt={"dample"} src="/static/images/avatar/1.jpg" />
                </StyledBadge>
              </ListItemAvatar>
              <ListItemText
                MuiListItemText-dense
                primary={"name"}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      // className={classes.inline}
                    >
                      "sample"
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        )}
      </div>

      {props.userList.length === 0 && (
        <div
          style={{ textAlign: "center", marginTop: "40vh", color: "#9E9E9E" }}
        >
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
