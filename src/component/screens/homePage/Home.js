import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { getFromStorage } from "../../storage";
import { Redirect } from "react-router-dom";
import ControlPanel from "../controlPanel/ControlPanel";
import { connect } from "react-redux";
import { verifyToken } from "../../../redux/actions/verifyToken";
import { fetchCurrentSystemUser } from "../../../redux/actions/fetchCurrentSystemUser";
import { fetchSectionsList } from "../../../redux/actions/fetchSectionsList";

function Home(props) {
  const [endSession, setEndSession] = useState(false);
  useEffect(() => {
    const obj = getFromStorage("documentTracking");

    if (obj && obj.token) {
      const { token } = obj;

      async function callback() {
        await props.verifyToken(token);
        await props.fetchCurrentSystemUser(token);
        await props.fetchSectionsList();
      }

      callback().catch((err) => {
        console.log(err);
      });
    }
    setEndSession(!(obj && obj.token));
  }, []);

  return (
    <div>
      {endSession && <Redirect to={"/login"} />}
      {Object.keys(props.token).length > 0 && (
        <>
          {props.token.isDeleted === "1" ? (
            <Redirect to={"/login"} />
          ) : (
            <>
              {props.user.role === "super_admin" && (
                <ControlPanel user={props.user} />
              )}
              {props.user.role === "member" && (
                <Dashboard user={props.user} sections={props.sections} />
              )}
              {props.user.role === "admin" && (
                <Dashboard user={props.user} sections={props.sections} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    token: state.verifyToken,
    user: state.fetchCurrentSystemUser,
    sections: state.fetchSectionsList,
  };
}

const mapDispatchToProps = {
  verifyToken,
  fetchCurrentSystemUser,
  fetchSectionsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
