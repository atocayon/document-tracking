import actionTypes from "./actionTypes";
import axios from "axios";
export function logout(token) {
  return function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/logout", {
        user_id: token,
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
