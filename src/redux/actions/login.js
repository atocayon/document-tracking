import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import { setInStorage } from "../../component/storage";

export function login(data) {
  const _data = {
    email: data.email,
    success: true
  };
  return function(dispatch) {
    return axios
      .post(
        "http://localhost:4000/dts/login/" + data.email + "/" + data.password
      )
      .then(res => {
        setInStorage("documentTracking", { token: res.data.token });
        dispatch({ type: actionTypes.USER_LOGIN, data: res.data });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.USER_LOGIN,
          data: { success: false }
        });
      });
  };
}
