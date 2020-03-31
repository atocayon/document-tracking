import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import InputField from "../../common/textField/InputField";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Reactotron from "reactotron-react-js";
import { userLogin } from "../../../redux/actions/login";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setInStorage } from "../../storage";

function LoginModal({ userLogin, user }) {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.length > 0) {
      setInStorage("documentTracking", { token: user[0].data.token });
      setLoading(false);
    }
  }, [user.length]);

  const onChange = ({ target }) => {
    setLogin({
      ...login,
      [target.name]: target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    userLogin(login);
  };

  // Reactotron.log(user.length > 0 ? user[0].data.token : null);
  return (
    <>
      {loading === false ? <Redirect to={"/"} /> : null}
      {/*{user[0] === true || user[0] === "true" ? <Redirect to={"/"} /> : null}*/}
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
              If you are not a registered user, kindly contact the admin of this
              system or any authorized person in your office/section/division to
              add you as new user.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={onSubmit}>
              Sign IN
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = {
  userLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
