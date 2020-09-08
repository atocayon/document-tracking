import React, { useEffect, useState } from "react";
import InputField from "../../common/textField/InputField";
import { Redirect } from "react-router-dom";
import { withSnackbar } from "notistack";
import logo from "../../../img/logo.svg";
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
import error from "../../sounds/glitch-in-the-matrix.mp3";
import loginSuccess from "../../sounds/quite-impressed.mp3";
import onClick from "../../sounds/pull-out.mp3";
import sideImg from "../../../img/Untitled-1.svg";
import userAvatar from "../../../img/user.svg";
import { ReactSVG } from "react-svg";
import CircularProgressComponent from "../../common/circularProgress/CircularProgressComponent";

const errorSound = new UIfx(error);
const _visible = new UIfx(onClick);
const _loginSuccess = new UIfx(loginSuccess);

function Login(props) {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [visiblePass, setVisiblePass] = useState(false);
  const [error, setError] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoading(false);
    if (Object.keys(props._login).length > 0) {
      if (props._login.message === "success") {
        const variant = "info";
        props.enqueueSnackbar("Hello! " + props._login.name, {
          variant,
        });
        setRedirect(true);
        _loginSuccess.play();
      } else {
        if (props._login.message === "unrecognized") {
          const _error = {};
          _error.usernameOrEmail = "Unregistered Username or Email";
          setError(_error);
          const variant = "error";
          props.enqueueSnackbar("Unregistered Username or Email", { variant });
          errorSound.play();
        }

        if (props._login.message === "incorrect") {
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

    if (!login.usernameOrEmail) _error.usernameOrEmail = "Email is required";
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

    await props.login(login);
  };

  return (
    <>
      {loading && <CircularProgressComponent />}
      {redirect && <Redirect to={"/"} />}
      {!redirect && (
        <>
          <div className={"row"}>
            <div className={"col-md-4"}>
              <ReactSVG
                src={sideImg}
                className={"sideImg"}
                beforeInjection={(svg) => {
                  svg.classList.add("svg-class-name");
                  svg.setAttribute("style", "height: 100vh");
                }}
              />

              <div className={"copyrights"}>
                <small>&copy; IMS_2020</small>
              </div>
            </div>
            <div className={"col-md-4"}>
              <ReactSVG src={logo} alt={"nmp_logo"} className={"logo"} />
            </div>
            <div className={"col-md-4"}>
              <div className={"row"}>
                <div className={"col-md-12"}>
                  <div className={"paper-container"}>
                    <div className={"row flex"}>
                      <div className={"col-md-12"}>
                        <div className={"logo-container"}>
                          <ReactSVG src={userAvatar} className={"userAvatar"} />
                        </div>
                      </div>
                    </div>

                    <div className={"row"}>
                      <div className={"col-md-2"}></div>
                      <div className={"col-md-8"}>
                        <hr className={"hr"} />

                        <form onSubmit={onSubmit}>
                          <h5 className={"login-header"}>WELCOME</h5>
                          <br />
                          <InputField
                            id={"email"}
                            label={"Username or Email"}
                            name={"usernameOrEmail"}
                            onChange={onChange}
                            error={error.usernameOrEmail}
                            type={"text"}
                          />
                          <br />
                          <br />
                          <FormControl fullWidth>
                            <InputLabel
                              style={error.password && { color: "red" }}
                            >
                              Password
                            </InputLabel>
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
                            <button
                              className={"btn btn-primary login-btn"}
                              type={"submit"}
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className={"col-md-2"}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
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
