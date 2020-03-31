import React, { useEffect, useState } from "react";
import Reactotron from "reactotron-react-js";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import { getFromStorage } from "../../storage";
import { verifyToken } from "../../../redux/actions/verifyToken";

import { Redirect } from "react-router-dom";

function Home({ user_token, verifyToken }) {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      verifyToken(token);
    } else {
      setRedirect(true);
    }
  }, []);

  return <div>{redirect ? <Redirect to={"/login"} /> : <Dashboard />}</div>;
}

function mapStateToProps(state) {
  return { user_token: state.token };
}

const mapDispatchToProps = {
  verifyToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
