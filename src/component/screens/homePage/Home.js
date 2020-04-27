import React, { useEffect, useState } from "react";
import Reactotron from "reactotron-react-js";
import Dashboard from "./Dashboard";
import { getFromStorage } from "../../storage";
import axios from "axios";
import { Redirect } from "react-router-dom";
import CircularProgressComponent from "../../common/circularProgress/CircularProgressComponent";
import ControlPanel from "./ControlPanel";

function Home() {
  const [token, setToken] = useState([]);
  const [user, setUser] = useState({});

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
              })
              .catch(err => {
                alert(err);
              });
        })
        .catch(err => {
          alert(err);
        });
    }else{
      setToken([...token, {success: false, message: "No Session Found"}]);
    }
  }, []);
  return (
    <div>
      {token.length > 0 ? (
        <>
          {token[0].success === false ? (
            <Redirect to={"/login"} />
          ) : (
              <>
                  {user.role === "1" || user.role === "2" ? (
                      <Dashboard user={user} />
                  ):(
                      <ControlPanel user={user} />
                  )}
              </>

          )}

        </>
      ) : (
        <CircularProgressComponent />
      )}
    </div>
  );
}

export default Home;
