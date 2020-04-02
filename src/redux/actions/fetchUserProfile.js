import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";

export function fetchUserProfile(id) {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/dts/user/" + id)
      .then(user => {
        dispatch({ type: actionTypes.USER_PROFILE, data: user.data[0] });
      })
      .catch(err => {
        dispatch({ type: actionTypes.USER_PROFILE, data: err });
      });
  };
}
