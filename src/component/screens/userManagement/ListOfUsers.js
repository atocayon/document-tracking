import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

export default function ListOfUsers(props) {
  const filter = props.sectionUsers.filter(
    user => user.user_id !== parseInt(props.token) && user.status !== "deleted"
  );

  return (
    <table className={"table"}>
      <tbody>
        {filter.map(user => (
          <tr key={user.user_id}>
            <td>
              <Link
                to={"/user/" + user.user_id}
                style={{ textDecoration: "none" }}
              >
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt={user.name}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        user.user_id === parseInt(props.token)
                          ? user.name + " (Me) "
                          : user.name
                      }
                      secondary={user.position + " - " + user.role}
                    />
                  </ListItem>
                </List>
              </Link>
            </td>
            <td>
              <ButtonGroup
                variant="text"
                color="default"
                aria-label="text primary button group"
                style={{ marginTop: 15 }}
              >
                {props.userRole === "admin" && (
                  <Button
                    style={{ color: "#2196F3" }}
                    onClick={props.handleAccountRole.bind(
                      null,
                      user.role === "admin"
                        ? { status: "member", id: user.user_id }
                        : { status: "admin", id: user.user_id }
                    )}
                  >
                    {user.role === "admin"
                      ? "Remove as admin"
                      : "Make as admin"}
                  </Button>
                )}
                <Button w>Transfer Office</Button>
                {props.userRole === "admin" && (
                  <Button style={{ color: "#FF9800" }}>
                    {user.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                )}

                {props.userRole === "admin" && (
                  <Button color={"secondary"}>Delete</Button>
                )}
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
