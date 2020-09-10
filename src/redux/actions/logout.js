import actionTypes from "./actionTypes";
import axios from "axios";
export function logout(token) {
  return function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/dts/logout", {
        userId: token,
      })
      .then((res) => {
        localStorage.clear();
        dispatch({ type: actionTypes.LOG_OUT, logout: "true" });
      })
      .catch((err) => {
        throw err;
      });
  };
}
