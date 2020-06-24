import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";


export function fetchDivisions() {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"fetchDivisions")
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_DIVISIONS, data: res.data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
