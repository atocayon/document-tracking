import actionTypes from "./actionTypes";
import axios from "axios";

export function notification(section) {
  return function (dispatch) {
    // return axios
    //   .get(server_ip.SERVER_IP_ADDRESS+"notification/" + section)
    //   .then((res) => {
    //     dispatch({ type: actionTypes.NOTIFICATION, data: res.data });
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };
}
