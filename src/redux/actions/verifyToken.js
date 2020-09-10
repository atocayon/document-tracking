import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function verifyToken(token) {
  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/", { token })
      .then((res) => {
        dispatch({ type: actionTypes.VERIFY_TOKEN, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
