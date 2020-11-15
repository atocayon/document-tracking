import actionTypes from "./actionTypes";
import { setInStorage } from "../../component/storage";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function login(data) {
  const { usernameOrEmail, password } = data;
  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/login", {
        usernameOrEmail,
        password,
      })
      .then((res) => {
        Reactotron.log(res.data);
        if (res.data.message !== "success") {
          dispatch({
            type: actionTypes.USER_LOGIN,
            data: { message: res.data.message },
          });
        } else {
          setInStorage("documentTracking", {
            token: res.data.id,
            role: res.data.role.dts,
          });
          dispatch({
            type: actionTypes.USER_LOGIN,
            data: { message: res.data.message, name: res.data.name },
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}
