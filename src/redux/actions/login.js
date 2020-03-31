import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";

export function userLogin(data) {
    Reactotron.log(data);
  return function(dispatch) {
    return axios
      .post(
        "http://localhost:4000/dts/login/" + data.email + "/" + data.password
      )
      .then(res => {
          Reactotron.log(res);
        if (res.status === 200) {

          dispatch({
            type: actionTypes.USER_LOGIN,
            login: res
          });
        } else {
          dispatch({
            type: actionTypes.USER_LOGIN,
            login: res
          });
        }
      })
      .catch(err => {
        dispatch({
          type: actionTypes.USER_LOGIN,
          login: err
        });
      });
  };
}
