import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function fetchAllUsers() {
  return function (dispatch) {
    return axios
      .get("http://" + localIpUrl("public", "ipv4") + ":4000/dts/getUsers")
      .then((_users) => {
        dispatch({
          type: actionTypes.FETCH_ALL_USER,
          data: _users.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
