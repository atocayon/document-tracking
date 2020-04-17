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
function LoginModal(props) {
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
        <Dialog
          open={true}
          aria-labelledby="form-dialog-title"
          style={{ marginTop: "-30vh" }}
        >
          <DialogTitle id="form-dialog-title">
            <VpnKeyIcon /> Users Login
          </DialogTitle>

          <form onSubmit={onSubmit}>
            <DialogContent>
              <InputField
                id={"email"}
                label={"Email"}
                variant={"outlined"}
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
                variant={"outlined"}
                name={"password"}
                onChange={onChange}
                error={error.password}
                type={"password"}
              />
              <br />
              <br />
              <DialogContentText>
                If you are not a registered user, kindly contact the admin of
                this system or any authorized person in your
                office/section/division to add you as new user.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={onSubmit}>
                Sign IN
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}

      {/*{user[0] === true || user[0] === "true" ? <Redirect to={"/"} /> : null}*/}
    </>
  );
}

export default withSnackbar(LoginModal);
