import React, { useEffect, useState } from "react";
import Reactotron from "reactotron-react-js";
import Dashboard from "./Dashboard";
import { getFromStorage } from "../../storage";
import axios from "axios";
import { Redirect } from "react-router-dom";
import CircularProgressComponent from "../../common/circularProgress/CircularProgressComponent";
import ControlPanel from "../controlPanel/ControlPanel";
import { connect } from "react-redux";
import { verifyToken } from "../../../redux/actions/verifyToken";
import { fetchCurrentSystemUser } from "../../../redux/actions/fetchCurrentSystemUser";
import { withSnackbar } from "notistack";

function Home(props) {
  const [endSession, setEndSession] = useState(false);
  useEffect(() => {
    const obj = getFromStorage("documentTracking");

    if (obj && obj.token) {
      const { token } = obj;

      async function callback() {
        await props.verifyToken(token);
        await props.fetchCurrentSystemUser(token);
      }

      callback().catch(err => {
        console.log(err);
      });
    }
    setEndSession(!(obj && obj.token));
  }, []);


  return (
    <div>
      {endSession && <Redirect to={"/login"} />}
      {Object.keys(props.token).length > 0 && (
        <>{props.token.isDeleted === "1" && <Redirect to={"/login"} />}
          {props.user.role === "3" && <ControlPanel user={props.user} />}
          {props.user.role === "2" && <Dashboard user={props.user} />}
          {props.user.role === "1" && <Dashboard user={props.user} />}
        </>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    token: state.verifyToken,
    user: state.fetchCurrentSystemUser
  };
}

const mapDispatchToProps = {
  verifyToken,
  fetchCurrentSystemUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
