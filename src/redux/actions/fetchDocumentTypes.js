import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";


export function fetchDocumentTypes() {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"documentType")
      .then((document) => {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_TYPES,
          data: document.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
