import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";

export function deleteDivision(id) {
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"deleteDivision/" + id)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.DELETE_DIVISION,
            data: id,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
}
