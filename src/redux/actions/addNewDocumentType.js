import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function addNewDocumentType(data) {
  return function (dispatch) {
    return axios
      .post("http://" + localIpUrl + ":4000/dts/addDocumentType", { ...data })
      .then((res) => {
        dispatch({ type: actionTypes.ADD_DOCUMENT_TYPE, data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
