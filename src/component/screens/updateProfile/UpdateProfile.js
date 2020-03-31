import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import owl from "../../../img/owl.png";
import { Link, Redirect } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { fetchUserProfile } from "../../../redux/actions/fetchUserProfile";
import { connect } from "react-redux";
import InputField from "../../common/textField/InputField";
function UpdateProfile({ match, fetchUserProfile, profile }) {
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    const id = match.params.id;

    if (id) {
      fetchUserProfile(match.params.id).catch(err => {
        throw err;
      });
    }
  }, []);

  return (
    <div>
      {profile.length === 0 ? (
        <Redirect to={"/"} />
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
                    <Link to={"/user/" + match.params.id}>
                      <ArrowBackIcon style={{fontSize: "2vw"}} />
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
                      &nbsp;&nbsp;Account Name
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <InputField
                        id={"name"}
                        name={"name"}
                        label={"Full Name"}
                        defaultValue={profile[0].data[0].name}
                        disabled={disable}
                      />
                    </td>
                    <td>
                      <button className={"btn"}>
                        <EditIcon />
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
                        defaultValue={profile[0].data[0].position}
                        disabled={disable}
                      />
                    </td>
                    <td>
                      <button className={"btn"}>
                        <EditIcon />
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
                        defaultValue={
                          profile[0].data[0].contact
                            ? profile[0].data[0].contact
                            : "Not Available"
                        }
                        disabled={disable}
                      />
                    </td>
                    <td>
                      <button className={"btn"}>
                        <EditIcon />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <InputField
                        id={"email"}
                        name={"email"}
                        label={"Email"}
                        defaultValue={
                          profile[0].data[0].email
                            ? profile[0].data[0].email
                            : "Not Available"
                        }
                        disabled={disable}
                      />
                    </td>
                    <td>
                      <button className={"btn"}>
                        <EditIcon />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <InputField
                        id={"address"}
                        name={"address"}
                        label={"Address"}
                        defaultValue={
                          profile[0].data[0].address
                            ? profile[0].data[0].address
                            : "Not Available"
                        }
                        disabled={disable}
                      />
                    </td>
                    <td>
                      <button className={"btn"}>
                        <EditIcon />
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
                        defaultValue={
                          profile[0].data[0].bdate
                            ? profile[0].data[0].bdate
                            : "Not Available"
                        }
                        disabled={disable}
                      />
                    </td>
                    <td>
                      <button className={"btn"}>
                        <EditIcon />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <InputField
                        id={"gender"}
                        name={"gender"}
                        label={"Gender"}
                        defaultValue={
                          profile[0].data[0].gender
                            ? profile[0].data[0].gender
                            : "Not Available"
                        }
                        disabled={disable}
                      />
                    </td>
                    <td>
                      <button className={"btn"}>
                        <EditIcon />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        <button className={"btn btn-info btn-sm"}>
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

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

const mapDispatchToProps = {
  fetchUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
