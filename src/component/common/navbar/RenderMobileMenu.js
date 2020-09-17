import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";

export default function RenderMobileMenu(props) {
  return (
    <Menu
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={props.anchorOriginMobileMenu}
      id={props.idMobileMenu}
      keepMounted
      transformOrigin={props.transformOriginMobileMenu}
      open={props.openMobileMenu}
      onClose={props.onCloseMobileMenu}
    >
      <MenuItem>
        {/* <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p> */}
      </MenuItem>
      <MenuItem>
        {/* <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p> */}
      </MenuItem>
      <MenuItem onClick={props.handleProfileMenuOpenMobileMenu}>
        {/* <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p> */}
      </MenuItem>
    </Menu>
  );
}
