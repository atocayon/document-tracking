import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import server_ip from "../server_ip";

export function fetchCurrentSystemUser(token) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"user/" + token)
      .then((_user) => {
        Reactotron.log(_user);
        dispatch({
          type: actionTypes.FETCH_SYSTEM_CURRENT_USER,
          data: _user.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
