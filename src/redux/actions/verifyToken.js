import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const localIpUrl = require("local-ip-url");

export function verifyToken(token) {
  Reactotron.log(token);
  return function (dispatch) {
    return axios
      .get("http://" + localIpUrl() + ":4000/dts/verifyToken/" + token)
      .then((_token) => {
        dispatch({ type: actionTypes.VERIFY_TOKEN, data: _token.data });
      })
      .catch((err) => {
        throw err;
        // alert(err);
      });
  };
}
