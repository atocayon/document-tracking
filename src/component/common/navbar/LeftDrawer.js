import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import BuildIcon from "@material-ui/icons/Build";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PrintIcon from "@material-ui/icons/Print";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";

export default function LeftDrawer(props) {
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
      <List>
        {["Maintenance", "User Management", "Generate Reports", "About"].map(
          (text, index) => (
            <>
              <Link to={index === 1 ? "/users/"+props.section : null}>
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index === 0 ? <BuildIcon /> : null}
                    {index === 1 ? <SupervisorAccountIcon /> : null}
                    {index === 2 ? <PrintIcon /> : null}
                    {index === 3 ? <InfoIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            </>
          )
        )}
      </List>
    </div>
  );
}
