import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";

export function fetchDocumentTypeById(id) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS + "fetchDocumentType/" + id)
      .then((document) => {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_TYPE_BY_ID,
          data: document.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
