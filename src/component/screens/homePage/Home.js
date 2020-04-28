import React, { useEffect, useState } from "react";
import Reactotron from "reactotron-react-js";
import Dashboard from "./Dashboard";
import { getFromStorage } from "../../storage";
import axios from "axios";
import { Redirect } from "react-router-dom";
import CircularProgressComponent from "../../common/circularProgress/CircularProgressComponent";
import ControlPanel from "../controlPanel/ControlPanel";

function Home() {
  const [token, setToken] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const obj = getFromStorage("documentTracking");

    if (obj && obj.token) {
      const { token } = obj;
      axios
        .get("http://localhost:4000/dts/varifyToken/" + token)
        .then(res => {
          setToken([...token, res.data]);

          axios
            .get("http://localhost:4000/dts/user/" + token)
            .then(_user => {
              setUser(_user.data);
              setLoading(false);
            })
            .catch(err => {
              alert(err);
            });
        })
        .catch(err => {
          alert(err);
        });
    }
  }, []);
  return (
    <div>
      {token.length > 0 && (
        <>
          {token[0].success === false && <Redirect to={"/login"} />}
          {user.role === "3" && <ControlPanel user={user} />}
          {user.role === "2" && <Dashboard user={user} />}
          {user.role === "1" && <Dashboard user={user} />}
        </>
      )}
      {token.length === 0 && <CircularProgressComponent />}

      {loading && <CircularProgressComponent />}
    </div>
  );
}

export default Home;
