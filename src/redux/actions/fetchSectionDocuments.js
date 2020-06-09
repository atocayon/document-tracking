import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";

export function fetchSectionDocuments(token) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"fetchSectionDocuments/" + token)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_SECTION_DOCUMENTS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
