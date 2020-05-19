import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function fetchDocumentId() {
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/documentId")
      .then((documentId) => {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_ID,
          data: documentId.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
