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
    (user) =>
      user.user_id !== parseInt(props.token) &&
      user.status !== "3" &&
      user.role !== "3"
  );

  return (
    <table className={"table"}>
      <tbody>
        {filter.map((user) => {
          const role = user.role === "1" ? "admin" : "member";
          return (
            <tr key={user.user_id}>
              <td>
                {props.userRole === "admin" ? (
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
                          secondary={user.position + " - " + role}
                        />
                      </ListItem>
                    </List>
                  </Link>
                ) : (
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
                        secondary={user.position + " - " + role}
                      />
                    </ListItem>
                  </List>
                )}
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
                        user.role === "1"
                          ? {
                              status: "2",
                              id: user.user_id,
                              name: user.name,
                              secid: user.secid,
                            }
                          : {
                              status: "1",
                              id: user.user_id,
                              name: user.name,
                              secid: user.secid,
                            }
                      )}
                    >
                      {user.role === "1" ? "Remove as admin" : "Make as admin"}
                    </Button>
                  )}
                  {props.userRole === "admin" && (
                    <Button
                      onClick={props.handleTransferOffice.bind(null, {
                        secid: user.secid,
                        section: user.section,
                        depshort: user.depshort,
                        department: user.department,
                        id: user.user_id,
                        name: user.name,
                      })}
                    >
                      Transfer Office
                    </Button>
                  )}

                  {props.userRole === "admin" && (
                    <Button
                      style={{ color: "#FF9800" }}
                      onClick={props.handleAccountStatus.bind(null, {
                        status: user.status === "1" ? "2" : "1",
                        id: user.user_id,
                        name: user.name,
                          secid: user.secid,
                      })}
                    >
                      {user.status === "1" ? "Deactivate" : "Activate"}
                    </Button>
                  )}

                  {props.userRole === "admin" && (
                    <Button
                      color={"secondary"}
                      onClick={props.handleAccountDeletion.bind(null, {
                        status: "3",
                        id: user.user_id,
                        name: user.name,
                          secid: user.secid
                      })}
                    >
                      Delete
                    </Button>
                  )}
                </ButtonGroup>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
