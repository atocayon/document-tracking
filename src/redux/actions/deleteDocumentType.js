import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";

export function deleteDocumentType(id) {
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"deleteDocumentType/" + id)
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_DOCUMENT_TYPE, data: id });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
