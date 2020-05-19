import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const localIpUrl = require("local-ip-url");

export function fetchCurrentSystemUser(token) {
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/user/" + token)
      .then((_user) => {
        Reactotron.log(_user);
        dispatch({
          type: actionTypes.FETCH_SYSTEM_CURRENT_USER,
          data: _user.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
