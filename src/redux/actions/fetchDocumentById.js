import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";


export function fetchDocumentById(id) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"fetchDocument/" + id)
      .then((document) => {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_BY_ID,
          data: document.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
