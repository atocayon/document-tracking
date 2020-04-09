import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { getFromStorage } from "../../storage";
import { Link, Redirect } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import InputField from "../../common/textField/InputField";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import ListOfUsers from "./ListOfUsers";
import Reactotron from "reactotron-react-js";
import { withSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import DialogComponent from "./DialogComponent";
function UserManagement(props) {
  const [sectionUsers, setSectionUsers] = useState([]);
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [endSesion, setEndSession] = useState(false);
  const [openDialog, setOpenDialog] = React.useState({
    open: false,
    status: "",
    name: "",
    id: null
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const obj = getFromStorage("documentTracking");

    if (obj && obj.token) {
      const { token } = obj;
      setToken(token);

      axios
        .get("http://localhost:4000/dts/user/" + token)
        .then(_user => {
          // Reactotron.log(_user);
          let section = _user.data.section;
          setUserRole(_user.data.role);
          axios
            .get("http://localhost:4000/dts/sectionUser/" + section.toString())
            .then(users => {
              setSectionUsers(users.data);
            })
            .catch(err => {
              alert(err);
            });
        })
        .catch(err => {
          alert(err);
        });
    }

    setEndSession(!(obj && obj.token));
  }, []);

  const handleAccountRole = val => {
    axios
      .post("http://localhost:4000/dts/updateRole", {
        role: val.status,
        id: val.id
      })
      .then(res => {
        const variant = "success";
        props.enqueueSnackbar(val.name + " role updated...", { variant });
        window.location.reload();
      })
      .catch(err => {
        const variant = "error";
        props.enqueueSnackbar(err, { variant });
      });
  };

  const handleTransferOffice = () => {};

  const handleAccountStatus = () => {};

  const handleClose = () => {
    setOpenDialog({
      ...openDialog,
      open: false
    });
  };

  const handleAccountDeletion = val => {
    setOpenDialog({
      ...openDialog,
      open: true,
      status: val.status,
      name: val.name,
      id: val.id
    });
  };

  const handleConfirmDeletion = () => {
    axios
      .post("http://localhost:4000/dts/updateStatus", {
        status: openDialog.status,
        id: openDialog.id
      })
      .then(res => {
        props.enqueueSnackbar(openDialog.name + " deleted...");
        window.location.reload();
      })
      .catch(err => {
        const variant = "error";
        props.enqueueSnackbar(err, { variant });
      });
  };

  return (
    <>
      {openDialog && (
        <DialogComponent
          fullscreen={fullScreen}
          openDialog={openDialog}
          handleClose={handleClose}
          handleConfirmDeletion={handleConfirmDeletion}
        />
      )}
      {endSesion && <Redirect to={"/"} />}
      <Paper
        elevation={3}
        style={{
          marginBottom: 0,
          bottom: 0,
          height: "100vh"
        }}
      >
        <div className={"jumbotron"} style={{ padding: 20 }}>
          <div className={"row"}>
            <div className={"col-md-2"}>
              <div className={"row"}>
                <div className={"col-md-6"}>
                  <Link to={"/"}>
                    <ArrowBackIcon style={{ fontSize: "2vw" }} />
                  </Link>
                </div>
                <div className={"col-md-6"}>
                  <div style={{ textAlign: "right" }}></div>
                </div>
              </div>
            </div>
            <div className={"col-md-10"}>
              <div className={"row"}>
                <div className={"col-md-6"}></div>
                <div className={"col-md-6"}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <SearchIcon />
                    </Grid>
                    <Grid item>
                      <InputField
                        id={"search"}
                        name={"search"}
                        label={"Search"}
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={"row"}>
          <div className={"col-md-12"}>
            <div
              style={{ marginLeft: 10, marginBottom: 20, textAlign: "left" }}
            >
              <Link to={"/registration"} className={"btn btn-sm btn-success"}>
                <AddIcon /> New Account
              </Link>
            </div>
          </div>
        </div>
        {sectionUsers.length > 0 && (
          <ListOfUsers
            sectionUsers={sectionUsers}
            token={token}
            userRole={userRole}
            handleAccountRole={handleAccountRole}
            handleAccountDeletion={handleAccountDeletion}
          />
        )}
      </Paper>
    </>
  );
}

export default withSnackbar(UserManagement);
