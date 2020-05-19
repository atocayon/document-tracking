import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function fetchDocumentTypes() {
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/documentType")
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
