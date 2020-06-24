import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";


export function addNewDocumentType(data) {
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"addDocumentType", { ...data })
      .then((res) => {
        dispatch({ type: actionTypes.ADD_DOCUMENT_TYPE, data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
