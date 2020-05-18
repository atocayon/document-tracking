import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const localIpUrl = require("local-ip-url");

export function fetchUserById(id) {
  return function (dispatch) {
    return axios
      .get(
        "http://" +
          localIpUrl("public", "ipv4") +
          ":4000/dts/user/" +
          parseInt(id)
      )
      .then((_user) => {
        dispatch({
          type: actionTypes.FETCH_USER_BY_ID,
          data: _user.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
