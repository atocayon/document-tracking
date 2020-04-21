import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import InputField from "../../common/textField/InputField";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Redirect } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../storage";
import axios from "axios";
import { withSnackbar } from "notistack";
import logo from "../../../img/logo.png";
import Paper from "@material-ui/core/Paper";
function Login(props) {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState({});

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      setRedirect(true);
    }
  }, []);

  const onChange = ({ target }) => {
    setLogin({
      ...login,
      [target.name]: target.value
    });
  };

  const formValidation = () => {
    const _error = {};

    if (!login.email) _error.email = "Email is required";
    if (!login.password) _error.password = "Password is required";

    setError(_error);
    return Object.keys(_error).length === 0;
  };

  const onSubmit = event => {
    event.preventDefault();

    if (!formValidation()) {
      const variant = "error";
      props.enqueueSnackbar("Input fields are required...", { variant });
      return;
    }
    axios
      .post(
        "http://localhost:4000/dts/login/" + login.email + "/" + login.password
      )
      .then(res => {
        if (res.status === 200) {
          const variant = "info";
          props.enqueueSnackbar("Login Successful...", { variant });
          setInStorage("documentTracking", { token: res.data.token });
          setRedirect(true);
        }

        if (res.status === 404) {
          const variant = "warning";
          props.enqueueSnackbar("Login Failed Incorrect Email/Password...", {
            variant
          });
        }
      })
      .catch(err => {
        const variant = "error";
        props.enqueueSnackbar(err, { variant });
      });
  };

  return (
    <>
      {redirect ? (
        <Redirect to={"/"} />
      ) : (
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-md-2"}></div>
            <div className={"col-md-8"}>
              <Paper style={{ marginTop: 100, borderTop: "2px solid grey" }}>
                <div className={"row"}>
                  <div className={"col-md-1"}>
                    <div style={{ marginLeft: 10, marginTop: 10 }}>
                      <img src={logo} alt={"nmp_logo"} style={{ width: 40 }} />
                    </div>
                  </div>
                  <div className={"col-md-11"}>
                    <div style={{ marginTop: 12 }}>
                      <h6>Login with your DTS Account</h6>
                    </div>
                  </div>
                </div>
                <hr />
                <br />
                <div className={"row"}>
                  <div className={"col-md-12"}>
                    <div
                      style={{
                        marginLeft: 50,
                        marginRight: 50,
                        marginBottom: 50
                      }}
                    >
                      <h5>
                        <span style={{ fontWeight: "bold" }}>Login</span>
                        <br />
                        <small>
                          to continue using the{" "}
                          <span style={{ color: "#2196F3" }}>DTS</span>{" "}
                        </small>
                      </h5>
                      <br />
                      <InputField
                        id={"email"}
                        label={"Email"}
                        name={"email"}
                        onChange={onChange}
                        error={error.email}
                        type={"email"}
                      />
                      <br />
                      <br />
                      <InputField
                        id={"password"}
                        label={"Password"}
                        name={"password"}
                        onChange={onChange}
                        error={error.password}
                        type={"password"}
                      />
                      <br />
                      <br />
                      <div style={{ textAlign: "right", marginTop: 50 }}>
                        <button className={"btn btn-primary"} onClick={onSubmit}>
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
            <div className={"col-md-2"}></div>
          </div>
        </div>
      )}
    </>
  );
}

export default withSnackbar(Login);
