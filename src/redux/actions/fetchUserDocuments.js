import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";

export function fetchUserDocuments(token) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"fetchUserDocuments/" + token)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_USER_DOCUMENTS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
