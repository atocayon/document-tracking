import React from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function ProfileMenu (props){
  return(
    <Menu
      anchorEl={props.anchorElProfileMenu}
      anchorOrigin={props.anchorOriginProfileMenu}
      id={props.idProfileMenu}
      keepMounted
      transformOrigin={props.transformOriginProfileMenu}
      open={props.openProfileMenu}
      onClose={props.onCloseProfileMenu}
    >
      <MenuItem onClick={props.handleMenuCloseProfileMenu}>Profile</MenuItem>
      <MenuItem onClick={props.handleMenuCloseProfileMenu}>My account</MenuItem>
    </Menu>

  );
}
