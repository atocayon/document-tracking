import React from "react";
import {Link} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

export default function ListOfUsers(props){
    return(
        <table className={"table"}>
            <tbody>
            {props.sectionUsers.map(user => (
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
                            {user.role === "admin" && (
                                <Button>
                                    Remove as admin
                                </Button>
                            ) }

                            <Button>Deactivate</Button>
                            <Button>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

    );
}