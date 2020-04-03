import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function verifyToken(token) {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/dts/varifyToken/" + token)
      .then(res => {

        dispatch({ type: actionTypes.VERIFY_USER, verify: res });
      })
      .catch(err => {
        dispatch({ type: actionTypes.VERIFY_USER, verify: err });
      });
  };
}
