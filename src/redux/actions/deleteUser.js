import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";


export function deleteUser(id) {
  return function (dispatch) {
    axios
      .post(server_ip.SERVER_IP_ADDRESS+"deleteUser", {
        id: id,
      })
      .then((_res) => {
        dispatch({ type: actionTypes.DELETE_USER, res: true });
        dispatch({ type: actionTypes.POP_USER, data: id });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.DELETE_USER, res: false });
      });
  };
}
