import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { getFromStorage } from "../../storage";
import { Link, Redirect } from "react-router-dom";
import InputField from "../../common/textField/InputField";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import ListOfUsers from "./ListOfUsers";
import { withSnackbar } from "notistack";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DialogComponent from "../../common/confirmationDialog/DialogComponent";
import TransferOfficeDialog from "../../common/transferOfficeDialog/TransferOfficeDialog";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import UserList from "../../common/userList/UserList";
import { connect } from "react-redux";
import { fetchSectionUsers } from "../../../redux/actions/fetchSectionUsers";
import { fetchSectionsList } from "../../../redux/actions/fetchSectionsList";
import { fetchUserById } from "../../../redux/actions/fetchUserById";
import CircularProgress from "../../common/circularProgress/CircularProgressComponent";
import io from "socket.io-client";
let socket;
function UserManagement(props) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [endSesion, setEndSession] = useState(false);
  const [openDialog, setOpenDialog] = React.useState({
    open: false,
    status: "",
    name: "",
    secid: "",
    id: null,
    content: "",
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [transferOfficeDialog, setTransderOfficeDialog] = useState({
    open: false,
    secid: "",
    section: "",
    depshort: "",
    department: "",
    id: null,
    name: "",
  });

  const [error, setError] = useState({});
  const [transfer, setTransfer] = useState({
    section: "",
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setLoading(false);
    const obj = getFromStorage("documentTracking");
    socket = io(process.env.REACT_APP_SERVER);
    if (obj && obj.token) {
      const { token } = obj;
      setToken(token);

      async function fetch() {
        await props.fetchSectionUsers(token);
        await props.fetchSectionsList();
        await props.fetchUserById(token);
      }

      fetch().catch((err) => {
        throw err;
      });
    }

    setEndSession(!(obj && obj.token));
  }, []);

  const handleAccountRole = async (val) => {
    axios
      .post(
        "http://" + process.env.REACT_APP_SERVER + "/dts/user/update/role",
        { role: val.status, user_id: val.id, sec_id: val.secid }
      )
      .then((res) => {
        const variant = "info";
        props.enqueueSnackbar(val.name + " role updated...", { variant });
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleTransferOffice = (val) => {
    setTransderOfficeDialog({
      ...transferOfficeDialog,
      open: true,
      secid: val.secid,
      section: val.section,
      depshort: val.depshort,
      department: val.department,
      id: val.id,
      name: val.name,
    });
  };

  const handleSelectOnChangeTransferOffice = ({ target }) => {
    setTransfer({
      ...transfer,
      [target.name]: target.value,
    });
  };

  const validateTransferOffice = () => {
    const _error = {};
    if (!transfer.section)
      _error.section = "Please specify the office of the requested party";

    setError(_error);

    return Object.keys(_error).length === 0;
  };

  const handleConfirmTransferOffice = async (event) => {
    event.preventDefault();

    if (!validateTransferOffice()) {
      const variant = "error";
      props.enqueueSnackbar("Office not specified", { variant });
      return;
    }

    setTransderOfficeDialog({
      ...transferOfficeDialog,
      open: false,
    });

    axios
      .post(
        "http://" + process.env.REACT_APP_SERVER + "/dts/user/transfer/office",
        { sec_id: transfer.section, user_id: transferOfficeDialog.id }
      )
      .then((res) => {
        const variant = "info";
        props.enqueueSnackbar("Office Transfer Success...", { variant });
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleAccountStatus = (val) => {
    let m = val.status === "2" ? "Deactivate" : "Activate";
    setOpenDialog({
      ...openDialog,
      open: true,
      status: val.status,
      name: m + " " + val.name + "?",
      secid: val.secid,
      id: val.id,
      content:
        "When you deactivate someone's account he/she will not be able to use this system. " +
        "If you unintentionally deactivated someone or you want them to have access again on this system, " +
        "you can activate them anytime.",
    });
  };

  const handleClose = () => {
    setOpenDialog({
      ...openDialog,
      open: false,
    });

    setTransderOfficeDialog({
      ...openDialog,
      open: false,
    });

    setTransfer({
      ...transfer,
      section: "",
    });
  };

  const handleAccountDeletion = (val) => {
    setOpenDialog({
      ...openDialog,
      open: true,
      status: val.status,
      name: "Delete " + val.name + " ?",
      secid: val.secid,
      id: val.id,
      content: "Warning, this action cannot be undone!",
    });
  };

  const handleConfirm = async () => {
    if (openDialog.status !== "3") {
      axios
        .post(
          "http://" + process.env.REACT_APP_SERVER + "/dts/user/update/status",
          {
            status: openDialog.status,
            user_id: openDialog.id,
            sec_id: openDialog.secid,
          }
        )
        .then((res) => {
          const variant = "info";
          props.enqueueSnackbar(openDialog.name + " " + res.data, { variant });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      axios
        .post("http://" + process.env.REACT_APP_SERVER + "/dts/user/delete", {
          user_id: openDialog.id,
        })
        .then((res) => {
          const variant = "warning";
          props.enqueueSnackbar(openDialog.name + " " + res.data, { variant });
        })
        .catch((err) => {
          throw err;
        });
    }

    setOpenDialog({
      ...openDialog,
      open: false,
      status: "",
      name: "",
      secid: "",
      id: null,
      content: "",
    });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {loading && <CircularProgress />}

      <div className={"row"}>
        <PrimarySearchAppBar />
        <div className={"col-md-2"}>
          <SideBarNavigation
            open={open}
            user={props.currentUser}
            setOpen={setOpen}
            handleClick={handleClick}
          />
        </div>
        <div className={"col-md-8"}>
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
              sections={props.sections}
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
              paddingBottom: 100,
              bottom: 0,
              height: "100vh",
              marginTop: 70,
              overflow: "auto",
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
                      <Link
                        to={"/registration"}
                        className={"btn btn-sm btn-info"}
                      >
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

                {props.data.sectionUsers.length > 0 && (
                  <ListOfUsers
                    sectionUsers={props.data.sectionUsers}
                    token={token}
                    userRole={props.data.currentUser.dts_role}
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
        </div>
        <div className={"col-md-2"}>
          <UserList />
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    data: state.fetchSectionUsers,
    sections: state.fetchSectionsList,
    currentUser: state.fetchUserById,
  };
}

const mapDispatchToProps = {
  fetchSectionUsers,
  fetchSectionsList,
  fetchUserById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(UserManagement));
