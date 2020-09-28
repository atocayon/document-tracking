import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import owl from "../../../img/owl.png";
import { Link, Redirect } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import InputField from "../../common/textField/InputField";
import { updateUserProfile } from "../../../redux/actions/updateUserProfile";
import { withSnackbar } from "notistack";
import { getFromStorage } from "../../storage";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import { fetchUserById } from "../../../redux/actions/fetchUserById";
import { fetchCurrentSystemUser } from "../../../redux/actions/fetchCurrentSystemUser";
import { inputChange } from "../../../redux/actions/inputChange";
import UserList from "../../common/userList/UserList";

function UpdateProfile(props) {
  const [endSession, setEndSession] = useState(false);
  const [open, setOpen] = useState(true);
  const [edit, setEdit] = useState({
    _employeeId: true,
    _name: true,
    _username: true,
    _contact: true,
    _email: true,
    _division: true,
    _section: true,
    _position: true,
    _address: true,
    _bdate: true,
    _gender: true,
  });

  useEffect(() => {
    const id = props.match.params.id;
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      async function fetch() {
        await props.fetchCurrentSystemUser(obj.token);
        await props.fetchUserById(id);
      }

      fetch().catch((err) => {
        throw err;
      });
    }

    setEndSession(!(obj && obj.token));

    if (props.update !== "") {
      if (props.update === "success") {
        const variant = "info";
        props.enqueueSnackbar("Update success", { variant });
      }
    }
  }, [props.update]);

  const handleClick = (val) => {
    setEdit({ ...edit, [val]: !edit[val] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await props.updateUserProfile(props.user);

    setEdit({
      ...edit,
      _employeeId: true,
      _name: true,
      _username: true,
      _contact: true,
      _email: true,
      _division: true,
      _section: true,
      _position: true,
      _address: true,
      _bdate: true,
      _gender: true,
    });
    // this.props.updateUserProfile(this.state.user);
  };

  const handleClickSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className={"row"}>
      <PrimarySearchAppBar />
      <div className={"col-md-2"}>
        <SideBarNavigation
          user={props.currentUser}
          open={open}
          handleClick={handleClickSidebar}
        />
      </div>
      <div className={"col-md-8"}>
        <div style={{ marginTop: 70 }}>
          {endSession && <Redirect to={"/"} />}
          {Object.keys(props.user).length === 0 && (
            <div className={"row"}>
              <div className={"col-md-12"}>
                <div style={{ textAlign: "center", marginTop: 70 }}>
                  <CircularProgress />
                </div>
              </div>
            </div>
          )}
          {Object.keys(props.user).length > 0 && (
            <Paper
              elevation={3}
              style={{
                color: "#263238",
                paddingBottom: 100,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <div className={"jumbotron"} style={{ padding: 50 }}>
                <div className={"row"}>
                  <div className={"col-md-2"}>
                    <div className={"row"}>
                      <div className={"col-md-6"}></div>
                      <div className={"col-md-6"}>
                        <div style={{ textAlign: "right" }}>
                          <img
                            src={owl}
                            alt={"owl"}
                            style={{ width: "3vw", paddingLeft: "1vw" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-10"}>
                    <h5>
                      Details you select will update{" "}
                      <span style={{ color: "#2196F3" }}>
                        Profile Information
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
              <Grid container spacing={3}>
                <div item xs={12}>
                  <div className={"row"}>
                    <div className={"col-md-2"}></div>
                    <div className={"col-md-8"}>
                      <table className={"table table-borderless"}>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                background: "#E9ECEF",
                                color: "#2196F3",
                              }}
                            >
                              <PersonIcon />
                              &nbsp;&nbsp;Account
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <InputField
                                id={"employeeId"}
                                name={"employeeId"}
                                label={"Employee ID"}
                                value={props.user.employeeId || ""}
                                disabled={edit._employeeId}
                                onChange={props.inputChange}
                              />
                            </td>
                            <td>
                              <button
                                className={"btn"}
                                onClick={handleClick.bind(null, "_employeeId")}
                              >
                                {edit._employeeId ? <EditIcon /> : <DoneIcon />}
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <InputField
                                id={"name"}
                                name={"name"}
                                label={"Full Name"}
                                value={props.user.name || ""}
                                disabled={edit._name}
                                onChange={props.inputChange}
                              />
                            </td>
                            <td>
                              <button
                                className={"btn"}
                                onClick={handleClick.bind(null, "_name")}
                              >
                                {edit._name ? <EditIcon /> : <DoneIcon />}
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <InputField
                                id={"username"}
                                name={"username"}
                                label={"Username"}
                                value={props.user.username || ""}
                                disabled={edit._username}
                                onChange={props.inputChange}
                              />
                            </td>
                            <td>
                              <button
                                className={"btn"}
                                onClick={handleClick.bind(null, "_username")}
                              >
                                {edit._username ? <EditIcon /> : <DoneIcon />}
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                background: "#E9ECEF",
                                color: "#2196F3",
                              }}
                            >
                              <WorkIcon />
                              &nbsp;&nbsp;Work
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <InputField
                                id={"position"}
                                name={"position"}
                                label={"Current Position"}
                                value={props.user.position || ""}
                                disabled={edit._position}
                                onChange={props.inputChange}
                              />
                            </td>
                            <td>
                              <button
                                className={"btn"}
                                onClick={handleClick.bind(null, "_position")}
                              >
                                {edit._position ? <EditIcon /> : <DoneIcon />}
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                background: "#E9ECEF",
                                color: "#2196F3",
                              }}
                            >
                              <ContactPhoneIcon />
                              &nbsp;&nbsp;Contact Information
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <InputField
                                id={"contact"}
                                name={"contact"}
                                label={"Contact No."}
                                value={props.user.contact || ""}
                                disabled={edit._contact}
                                onChange={props.inputChange}
                              />
                            </td>
                            <td>
                              <button
                                className={"btn"}
                                onClick={handleClick.bind(null, "_contact")}
                              >
                                {edit._contact ? <EditIcon /> : <DoneIcon />}
                              </button>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <InputField
                                id={"email"}
                                name={"email"}
                                label={"Email"}
                                value={props.user.email || ""}
                                disabled={edit._email}
                                onChange={props.inputChange}
                              />
                            </td>
                            <td>
                              <button
                                className={"btn"}
                                onClick={handleClick.bind(null, "_email")}
                              >
                                {edit._email ? <EditIcon /> : <DoneIcon />}
                              </button>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <div
                                style={{ textAlign: "right", marginTop: 50 }}
                              >
                                <Link
                                  className={"btn btn-outline-info btn-sm"}
                                  to={"/user/" + props.match.params.id}
                                >
                                  <ArrowBackIcon />
                                  &nbsp;&nbsp; Back to Profile
                                </Link>
                                &nbsp;&nbsp;&nbsp;
                                <button
                                  className={"btn btn-info btn-sm"}
                                  onClick={handleSubmit}
                                >
                                  <SaveIcon />
                                  &nbsp;&nbsp; Save Changes
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className={"col-md-2"}></div>
                  </div>
                </div>
              </Grid>
            </Paper>
          )}
        </div>
      </div>
      <div className={"col-md-2"}>
        <UserList />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.fetchCurrentSystemUser,
    user: state.fetchUserById,
    update: state.update,
  };
}

const mapDispatchToProps = {
  updateUserProfile,
  fetchUserById,
  fetchCurrentSystemUser,
  inputChange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(UpdateProfile));
