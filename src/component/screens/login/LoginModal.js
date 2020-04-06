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

function LoginModal() {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

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

  const onSubmit = event => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:4000/dts/login/" + login.email + "/" + login.password
      )
      .then(res => {
        setInStorage("documentTracking", { token: res.data.token });
        setRedirect(true);
      })
      .catch(err => {
        alert(err);
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
                id={""}
                label={"Email"}
                variant={"outlined"}
                name={"email"}
                onChange={onChange}
              />
              <br />
              <br />
              <InputField
                id={""}
                label={"Password"}
                variant={"outlined"}
                name={"password"}
                onChange={onChange}
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

export default LoginModal;
