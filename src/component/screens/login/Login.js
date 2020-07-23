import React, { useEffect, useState } from "react";
import InputField from "../../common/textField/InputField";
import { Redirect } from "react-router-dom";
import { withSnackbar } from "notistack";
import logo from "../../../img/logo.png";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/login";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import UIfx from "uifx";
import io from "socket.io-client";
import endPoint from "../../endPoint";
import error from "../../sounds/glitch-in-the-matrix.mp3";
import loginSuccess from "../../sounds/quite-impressed.mp3";
import onClick from "../../sounds/pull-out.mp3";
import "../../../styles/login.css";
const errorSound = new UIfx(error);
const _visible = new UIfx(onClick);
const _loginSuccess = new UIfx(loginSuccess);

let socket;
function Login(props) {
  const [login, setLogin] = useState({
    emailOrPassword: "",
    password: "",
  });

  const [visiblePass, setVisiblePass] = useState(false);

  const [error, setError] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    socket = io(endPoint.ADDRESS);

    if (Object.keys(props._login).length > 0) {
      if (props._login.success === true) {
        const variant = "info";
        props.enqueueSnackbar("Hello! " + props._login.message, {
          variant,
        });
        setRedirect(true);
        _loginSuccess.play();
      } else {
        if (props._login.message === "server error") {
          const variant = "error";
          props.enqueueSnackbar(props._login.message, { variant });
          errorSound.play();
        }

        if (props._login.message === "unrecognize email") {
          const _error = {};
          _error.email = "Unregistered Username or Email";
          setError(_error);
          const variant = "error";
          props.enqueueSnackbar("Unregistered Username or Email", { variant });
          errorSound.play();
        }

        if (props._login.message === "incorrect password") {
          const _error = {};
          _error.password = "Incorrect Password";
          setError(_error);
          const variant = "error";
          props.enqueueSnackbar("Incorrect Password", { variant });
          errorSound.play();
        }
      }
    }
  }, [props._login]);

  const onChange = ({ target }) => {
    setLogin({
      ...login,
      [target.name]: target.value,
    });
  };

  const formValidation = () => {
    const _error = {};

    if (!login.emailOrPassword) _error.email = "Email is required";
    if (!login.password) _error.password = "Password is required";

    setError(_error);
    return Object.keys(_error).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!formValidation()) {
      const variant = "error";
      props.enqueueSnackbar("Email and Password is required...", {
        variant,
      });

      return errorSound.play();
    }

    await props.login(login, socket);
  };

  return (
    <>
      {redirect && <Redirect to={"/"} />}
      {!redirect && (
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-md-2"}></div>
            <div className={"col-md-8"} >
              <Paper className={"paper-container"}>
                <div className={"row flex"}>
                  <div className={"col-md-1"}>
                    <div className={"logo-container"}>
                      <img src={logo} alt={"nmp_logo"} className={"logo"} />
                    </div>
                  </div>
                  <div className={"col-md-11"}>
                    <div className={"login-title-container"}>
                      <h6 className={"title"}>Login with your DTS Account</h6>
                    </div>
                  </div>
                </div>
                <hr className={"hr"} />
                <br />
                <div className={"row"}>
                  <div className={"col-md-12"}>
                    <div
                      style={{
                        marginLeft: 50,
                        marginRight: 50,
                        marginBottom: 50,
                      }}
                    >
                      <form onSubmit={onSubmit}>
                        <h5 className={"login-header"}>
                          <span className={"login-text"}>Login</span>
                          <br />
                          <small>
                            to continue using the{" "}
                            <span style={{ color: "#2196F3" }}>DTS</span>{" "}
                          </small>
                        </h5>
                        <br />
                        <InputField
                          id={"email"}
                          label={"Username or Email"}
                          name={"emailOrPassword"}
                          onChange={onChange}
                          error={error.email}
                          type={"text"}
                        />
                        <br />
                        <br />
                        <FormControl fullWidth>
                          <InputLabel style={error.password && {color: "red"}}>Password</InputLabel>
                          <Input
                              className={"password-input"}
                            id={"password"}
                            name={"password"}
                            onChange={onChange}
                            type={visiblePass ? "text" : "password"}
                            style={
                              error.password && {
                                borderBottom: "1px solid red",
                                color: "red",
                              }
                            }
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  title={"clear"}
                                  aria-label="toggle password visibility"
                                  onClick={() => {
                                    setVisiblePass(!visiblePass);
                                    _visible.play();
                                  }}
                                  onMouseDown={() => {
                                    setVisiblePass(!visiblePass);
                                    _visible.play();
                                  }}
                                  edge="end"
                                >
                                  {visiblePass ? (
                                    <VisibilityOffIcon />
                                  ) : (
                                    <VisibilityIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <small style={{ color: "red" }}>
                            {error.password}
                          </small>
                        </FormControl>

                        <br />
                        <br />
                        <div className={"login-btn-container"}>
                          <button className={"btn btn-primary login-btn"} type={"submit"}>
                            Login
                          </button>
                        </div>
                      </form>
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

function mapStateToProps(state) {
  return {
    _login: state.login,
  };
}

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Login));
