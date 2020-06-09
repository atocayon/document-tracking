import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";
export function fetchPendingDocuments(user_id) {
  return function (dispatch) {
    return axios
          .get(server_ip.SERVER_IP_ADDRESS+"fetchPendingDocument/" + user_id)
          .then((res) => {
            dispatch({ type: actionTypes.FETCH_PENDING_DOCUMENTS, data: res.data });
          })
          .catch((err) => {
            throw err;
          });


  };
}
