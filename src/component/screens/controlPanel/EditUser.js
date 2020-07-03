import React from "react";
import { withSnackbar } from "notistack";
import Reactotron from "reactotron-react-js";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SelectField from "../../common/selectField/SelectField";
import InputField from "../../common/textField/InputField";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import WorkIcon from "@material-ui/icons/Work";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "#2196F3",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let user_role = [
  { id: "1", type: "Admin" },
  { id: "2", type: "Member" },
  { id: "3", type: "Super Admin" },
];

function EditUser(props) {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            component={"span"}
            variant={"h6"}
            className={classes.title}
          >
            Edit User Information
          </Typography>
          <Button autoFocus color="inherit" onClick={props.handleSaveEditUser}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-md-2"}></div>
          <div className={"col-md-8"}>
            <div style={{ marginTop: 50, marginBottom: 50 }}>
              <h5 style={{ textAlign: "left", color: "#2196F3" }}>
                <AccountBoxIcon />
                &nbsp;Profile Account
              </h5>
              <br />
              <div className={"row"}>
                <div className={"col-md-4"}>
                  <SelectField
                    id={"cPanel_edit_section"}
                    name={"secid"}
                    onChange={props.handleOnChangeEditUser}
                    label={props.userInfo.section}
                    options={props.sections}
                    variant={"outlined"}
                    value={props.userInfo.secid}
                    // error={props.error.section}
                  />
                  <br />

                  <SelectField
                    id={"cPanel_edit_user_role"}
                    name={"role"}
                    onChange={props.handleOnChangeEditUser}
                    label={
                      props.userInfo.role_id === "1"
                        ? "Admin"
                        : props.userInfo.role_id === "2"
                        ? "Member"
                        : "Super Admin"
                    }
                    options={user_role}
                    variant={"outlined"}
                    value={props.userInfo.role}
                    // error={props.error.user_role}
                  />
                </div>
              </div>

              <br />
              <InputField
                id={"cPanel_edit_employeeId"}
                name={"employeeId"}
                label={"Employee ID"}
                variant={"outlined"}
                onChange={props.handleOnChangeEditUser}
                value={props.userInfo.employeeId || ""}
                type={"number"}
              />
              <br />
              <br />
              <InputField
                id={"cPanel_edit_name"}
                name={"name"}
                label={"Full Name"}
                variant={"outlined"}
                onChange={props.handleOnChangeEditUser}
                value={props.userInfo.name || ""}
                type={"text"}
              />
              <br />
              <br />
              <InputField
                id={"cPanel_edit_username"}
                name={"username"}
                label={"Username"}
                variant={"outlined"}
                onChange={props.handleOnChangeEditUser}
                value={props.userInfo.username || ""}
                type={"text"}
              />
              <br />
              <br />
              <h5 style={{ textAlign: "left", color: "#2196F3" }}>
                <ContactPhoneIcon />
                &nbsp;Contact Information
              </h5>
              <br />

              <InputField
                id={"cPanel_edit_email"}
                name={"email"}
                label={"Email"}
                variant={"outlined"}
                onChange={props.handleOnChangeEditUser}
                value={props.userInfo.email || ""}
                type={"email"}
              />
              <br />
              <br />
              <InputField
                id={"cPanel_edit_contact"}
                name={"contact"}
                label={"Mobile Number"}
                variant={"outlined"}
                onChange={props.handleOnChangeEditUser}
                value={props.userInfo.contact || ""}
                type={"text"}
              />
              <br />
              <br />
              <h5 style={{ textAlign: "left", color: "#2196F3" }}>
                <WorkIcon />
                &nbsp;Work Position
              </h5>
              <br />
              <InputField
                id={"cPanel_edit_position"}
                name={"position"}
                label={"Work Position/Function"}
                variant={"outlined"}
                onChange={props.handleOnChangeEditUser}
                value={props.userInfo.position || ""}
                type={"text"}
              />
            </div>
          </div>
          <div className={"col-md-2"}></div>
        </div>
      </div>
    </Dialog>
  );
}

export default withSnackbar(EditUser);
