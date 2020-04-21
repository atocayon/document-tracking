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
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DialogComponent from "../../common/confirmationDialog/DialogComponent";
import TransferOfficeDialog from "../../common/transferOfficeDialog/TransferOfficeDialog";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";

function UserManagement(props) {
  const [sectionUsers, setSectionUsers] = useState([]);
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [endSesion, setEndSession] = useState(false);
  const [openDialog, setOpenDialog] = React.useState({
    open: false,
    status: "",
    name: "",
    id: null,
    content: ""
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [sections, setSections] = useState([]);
  const [transferOfficeDialog, setTransderOfficeDialog] = useState({
    open: false,
    secid: "",
    section: "",
    depshort: "",
    department: "",
    id: null,
    name: ""
  });

  const [error, setError] = useState({});
  const [transfer, setTransfer] = useState({
    section: ""
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const obj = getFromStorage("documentTracking");

    if (obj && obj.token) {
      const { token } = obj;
      setToken(token);

      axios
        .get("http://localhost:4000/dts/user/" + token)
        .then(_user => {
          // Reactotron.log(_user);
          let section = _user.data.secid;
          setUserRole(_user.data.role);

          axios
            .get("http://localhost:4000/dts/sectionUser/" + section.toString())
            .then(users => {
              setSectionUsers(users.data);

              axios
                .get("http://localhost:4000/dts/sections")
                .then(res => {
                  setSections(res.data);
                })
                .catch(err => {
                  const variant = "error";
                  props.enqueueSnackbar(err, { variant });
                });
            })
            .catch(err => {
              const variant = "error";
              props.enqueueSnackbar(err, { variant });
            });
        })
        .catch(err => {
          const variant = "error";
          props.enqueueSnackbar(err, { variant });
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
        const variant = "info";
        props.enqueueSnackbar(val.name + " role updated...", { variant });
        window.location.reload();
      })
      .catch(err => {
        const variant = "error";
        props.enqueueSnackbar(err, { variant });
      });
  };

  const handleTransferOffice = val => {
    setTransderOfficeDialog({
      ...transferOfficeDialog,
      open: true,
      secid: val.secid,
      section: val.section,
      depshort: val.depshort,
      department: val.department,
      id: val.id,
      name: val.name
    });
  };

  const handleSelectOnChangeTransferOffice = ({ target }) => {

    setTransfer({
      ...transfer,
      [target.name]: target.value
    });
  };

  const validateTransferOffice = () => {
    const _error = {};
    if (!transfer.section)
      _error.section = "Please specify the office of the requested party";

    setError(_error);

    return Object.keys(_error).length === 0;
  };

  const handleConfirmTransferOffice = event => {
    event.preventDefault();

    if (!validateTransferOffice()) {
      const variant = "error";
      props.enqueueSnackbar("Office not specified", { variant });
      return;
    }

    setTransderOfficeDialog({
      ...transferOfficeDialog,
      open: false
    });

    axios
      .post("http://localhost:4000/dts/transferOffice", {
        id: transferOfficeDialog.id,
        section: transfer.section
      })
      .then(res => {
        const variant = "success";
        props.enqueueSnackbar("Office Transfer Success...", { variant });
        window.location.reload();
      })
      .catch(err => {
        const variant = "error";
        props.enqueueSnackbar(err, { variant });
      });
  };

  const handleAccountStatus = val => {
    let m = val.status === "2" ? "Deactivate" : "Activate";
    setOpenDialog({
      ...openDialog,
      open: true,
      status: val.status,
      name: m + " " + val.name + "?",
      id: val.id,
      content:
        "When you deactivate someone's account he/she will not be able to use this system. " +
        "If you unintentionally deactivated someone or you want them to have access again on this system, " +
        "you can activate them anytime."
    });
  };

  const handleClose = () => {
    setOpenDialog({
      ...openDialog,
      open: false
    });

    setTransderOfficeDialog({
      ...openDialog,
      open: false
    });

    setTransfer({
      ...transfer,
      section: ""
    });
  };

  const handleAccountDeletion = val => {
    setOpenDialog({
      ...openDialog,
      open: true,
      status: val.status,
      name: "Delete " + val.name + " ?",
      id: val.id,
      content:
        "If this action is unintended, you can still retrieve this account in Deleted Accounts section in left drawer."
    });
  };

  const handleConfirm = () => {
    axios
      .post("http://localhost:4000/dts/updateStatus", {
        status: openDialog.status,
        id: openDialog.id
      })
      .then(res => {
        const variant = "warning";
        props.enqueueSnackbar(openDialog.name + " " + res, { variant });
        window.location.reload();
      })
      .catch(err => {
        const variant = "error";
        props.enqueueSnackbar(err, { variant });
      });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Grid container spacing={3}>
      <PrimarySearchAppBar />
      <Grid item xs={2}>
        <SideBarNavigation
            open={open}
            setOpen={setOpen}
            handleClick={handleClick}
        />
      </Grid>
      <Grid item xs={8}>
        {openDialog && (
            <DialogComponent
                fullscreen={fullScreen}
                openDialog={openDialog.open}
                title={openDialog.name}
                content={openDialog.content}
                handleClose={handleClose}
                handleConfirm={handleConfirm}
            />
        )}
        {transferOfficeDialog && (
            <TransferOfficeDialog
                fullscreen={fullScreen}
                transferOfficeDialog={transferOfficeDialog}
                sections={sections}
                transfer={transfer}
                handleClose={handleClose}
                handleConfirmTransferOffice={handleConfirmTransferOffice}
                handleSelectOnChangeTransferOffice={
                  handleSelectOnChangeTransferOffice
                }
                error={error}
            />
        )}
        {endSesion && <Redirect to={"/"} />}
        <Paper
            elevation={3}
            style={{
              marginBottom: 0,
              bottom: 0,
              height: "100vh",
              marginTop: 70
            }}
        >
          <div className={"jumbotron"} style={{ padding: 50 }}>
            <div className={"row"}>
              <div className={"col-md-2"}>
                <div className={"row"}>
                  <div className={"col-md-6"}>
                    {/*<Link to={"/"}>*/}
                    {/*  <ArrowBackIcon style={{ fontSize: "2vw" }} />*/}
                    {/*</Link>*/}
                  </div>
                  <div className={"col-md-6"}>
                    <div style={{ textAlign: "right" }}></div>
                  </div>
                </div>
              </div>
              <div className={"col-md-10"}>
                {/*<h5>User Management</h5>*/}
              </div>
            </div>
          </div>

          <div className={"row"}>
            <div className={"col-md-1"}></div>
            <div className={"col-md-10"}>
              <div style={{ marginBottom: 20 }}>
                <div className={"row"}>
                  <div className={"col-md-6"}>
                    <Link to={"/registration"} className={"btn btn-sm btn-info"}>
                      <AddIcon />
                    </Link>
                  </div>
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

              {sectionUsers.length > 0 && (
                  <ListOfUsers
                      sectionUsers={sectionUsers}
                      token={token}
                      userRole={userRole}
                      handleAccountRole={handleAccountRole}
                      handleAccountDeletion={handleAccountDeletion}
                      handleAccountStatus={handleAccountStatus}
                      handleTransferOffice={handleTransferOffice}
                  />
              )}
            </div>
            <div className={"col-md-1"}></div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>

    </Grid>
  );
}

export default withSnackbar(UserManagement);
