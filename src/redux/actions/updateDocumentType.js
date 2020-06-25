import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";

export function updateDocumentType(data) {
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"updateDocumentType", {
        ...data,
      })
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_DOCUMENT_TYPE, data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
