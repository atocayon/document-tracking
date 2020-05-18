import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function deleteUser(id) {
  return function (dispatch) {
    axios
      .post("http://" + localIpUrl("public", "ipv4") + ":4000/dts/deleteUser", {
        id: id,
      })
      .then((_res) => {
        dispatch({ type: actionTypes.DELETE_USER, res: true });
        dispatch({ type: actionTypes.POP_USER, data: id });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.DELETE_USER, res: false });
      });
  };
}
