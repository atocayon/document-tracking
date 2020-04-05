import React, { useEffect, useState } from "react";
import Reactotron from "reactotron-react-js";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import { getFromStorage } from "../../storage";
import { verifyToken } from "../../../redux/actions/verifyToken";
import axios from "axios";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import CircularProgressComponent from "../../common/circularProgress/CircularProgressComponent";

function Home(props) {
  const [redirect, setRedirect] = useState(false);
  const [token, setToken] = useState([]);

  useEffect(() => {
    Reactotron.log("Home Component");
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      Reactotron.log(token);
      axios
        .get("http://localhost:4000/dts/varifyToken/" + token)
        .then(res => {
          setToken(res.data);
        })
        .catch(err => {
          alert(err);
        });
    } else {
      setRedirect(true);
    }
  }, []);

  Reactotron.log(token);
  return (
      <div>
        {Object.keys(token).length > 0 ? (
            <>
              {redirect || token.success !== true ? <Redirect to={"/login"} /> : <Dashboard user={props.user} />}
            </>
        ):(
           <CircularProgressComponent/>
        )}

      </div>
  );
}

export default Home;
