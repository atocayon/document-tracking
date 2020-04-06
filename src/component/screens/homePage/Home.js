import React, { useEffect, useState } from "react";
import Reactotron from "reactotron-react-js";
import Dashboard from "./Dashboard";
import { getFromStorage } from "../../storage";
import axios from "axios";
import { Redirect } from "react-router-dom";
import CircularProgressComponent from "../../common/circularProgress/CircularProgressComponent";

function Home(props) {
  const [token, setToken] = useState([]);
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      axios
        .get("http://localhost:4000/dts/varifyToken/" + token)
        .then(res => {
          setToken([...token, res.data]);
        })
        .catch(err => {
          alert(err);
        });
    }
  }, []);
  return (
    <div>
      {token.length > 0 ? (
        <>
          {token[0].success === false ? (
            <Redirect to={"/login"} />
          ) : (
            <Dashboard user={props.user} />
          )}
        </>
      ) : (
        <CircularProgressComponent />
      )}
    </div>
  );
}

export default Home;
