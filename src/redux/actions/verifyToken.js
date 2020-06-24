import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import server_ip from "../server_ip";


export function verifyToken(token) {
  Reactotron.log(token);
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"verifyToken/" + token)
      .then((_token) => {
        dispatch({ type: actionTypes.VERIFY_TOKEN, data: _token.data });
      })
      .catch((err) => {
        throw err;
        // alert(err);
      });
  };
}
