import React, { Component} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import owl from "../../../img/owl.png";
import {Link, Redirect} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import InputField from "../../common/textField/InputField";
import { updateUserProfile } from "../../../redux/actions/updateUserProfile";
import Reactotron from "reactotron-react-js";
import axios from "axios";

import { withSnackbar } from 'notistack';
import {getFromStorage} from "../../storage";
class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endSession: false,
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
      user: []
    };
  }

  componentDidMount() {

    const id = this.props.match.params.id;
    const obj = getFromStorage("documentTracking");
    axios
      .get("http://localhost:4000/dts/user/" + id)
      .then(user => {
        // Reactotron.log(user.data);
        this.setState({ user: user.data });
      })
      .catch(err => {
        alert(err);
      });

    this.setState({endSession: !(obj && obj.token)});
  }

  handleChange = ({ target }) => {
    this.setState((state, props) => {
      // Reactotron.log(target.name);
      state.user[target.name] = target.value;

      return state;
    });
  };

  handleClick = val => {
    this.setState({
      [val]: !this.state[val]
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.updateUserProfile(this.state.user);
  };


  render() {
    const { user } = this.state;
    if (this.props.update.length > 0) {
      Reactotron.log(this.props.update[0].data);
      if (this.props.update[0].data === "update success") {
        const variant = 'success';
        this.props.enqueueSnackbar('Update Success!', {variant});
      }else{
        this.props.enqueueSnackbar('There is an error updating...');
      }
    }
    return (
      <div>
        {this.state.endSession && <Redirect to={"/"} />}
        {Object.keys(user).length === 0 ? (
          <div className={"row"}>
            <div className={"col-md-12"}>
              <div style={{ textAlign: "center", marginTop: 70 }}>
                <CircularProgress />
              </div>
            </div>
          </div>
        ) : (
          <Paper
            elevation={3}
            style={{
              color: "#263238",
              paddingBottom: "5vh"
            }}
          >
            <div className={"jumbotron"} style={{ padding: 20 }}>
              <div className={"row"}>
                <div className={"col-md-2"}>
                  <div className={"row"}>
                    <div className={"col-md-6"}>
                      <Link to={"/user/" + this.props.match.params.id}>
                        <ArrowBackIcon style={{ fontSize: "2vw" }} />
                      </Link>
                    </div>
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
                      <u>Profile Information</u>
                    </span>
                  </h5>
                </div>
              </div>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <table className={"table table-borderless"}>
                  <tbody>
                    <tr>
                      <td style={{ background: "#E9ECEF" }}>
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
                          defaultValue={user.employeeId}
                          disabled={this.state._employeeId}
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        <button
                          className={"btn"}
                          onClick={this.handleClick.bind(null, "_employeeId")}
                        >
                          {this.state._employeeId ? <EditIcon /> : <DoneIcon />}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <InputField
                          id={"name"}
                          name={"name"}
                          label={"Full Name"}
                          defaultValue={user.name}
                          disabled={this.state._name}
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        <button
                          className={"btn"}
                          onClick={this.handleClick.bind(null, "_name")}
                        >
                          {this.state._name ? <EditIcon /> : <DoneIcon />}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <InputField
                          id={"username"}
                          name={"username"}
                          label={"Username"}
                          defaultValue={user.username}
                          disabled={this.state._username}
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        <button
                          className={"btn"}
                          onClick={this.handleClick.bind(null, "_username")}
                        >
                          {this.state._username ? <EditIcon /> : <DoneIcon />}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ background: "#E9ECEF" }}>
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
                          defaultValue={user.position}
                          disabled={this.state._position}
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        <button
                          className={"btn"}
                          onClick={this.handleClick.bind(null, "_position")}
                        >
                          {this.state._position ? <EditIcon /> : <DoneIcon />}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ background: "#E9ECEF" }}>
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
                          defaultValue={user.contact}
                          disabled={this.state._contact}
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        <button
                          className={"btn"}
                          onClick={this.handleClick.bind(null, "_contact")}
                        >
                          {this.state._contact ? <EditIcon /> : <DoneIcon />}
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <InputField
                          id={"email"}
                          name={"email"}
                          label={"Email"}
                          defaultValue={user.email}
                          disabled={this.state._email}
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        <button
                          className={"btn"}
                          onClick={this.handleClick.bind(null, "_email")}
                        >
                          {this.state._email ? <EditIcon /> : <DoneIcon />}
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <InputField
                          id={"address"}
                          name={"address"}
                          label={"Address"}
                          defaultValue={user.address}
                          disabled={this.state._address}
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        <button
                          className={"btn"}
                          onClick={this.handleClick.bind(null, "_address")}
                        >
                          {this.state._address ? <EditIcon /> : <DoneIcon />}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ background: "#E9ECEF" }}>
                        <ContactSupportIcon />
                        &nbsp;&nbsp;Other Information
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <InputField
                          id={"bdate"}
                          name={"bdate"}
                          label={"Date of Birth"}
                          defaultValue={user.bdate}
                          disabled={this.state._bdate}
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        <button
                          className={"btn"}
                          onClick={this.handleClick.bind(null, "_bdate")}
                        >
                          {this.state._bdate ? <EditIcon /> : <DoneIcon />}
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <InputField
                          id={"gender"}
                          name={"gender"}
                          label={"Gender"}
                          defaultValue={user.gender}
                          disabled={this.state._gender}
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        <button
                          className={"btn"}
                          onClick={this.handleClick.bind(null, "_gender")}
                        >
                          {this.state._gender ? <EditIcon /> : <DoneIcon />}
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div style={{ textAlign: "right" }}>
                          <button
                            className={"btn btn-info btn-sm"}
                            onClick={this.handleSubmit}
                          >
                            <SaveIcon />
                            &nbsp;&nbsp; Save Changes
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </Paper>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

    update: state.update
  };
}

const mapDispatchToProps = {
  updateUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(UpdateProfile));
