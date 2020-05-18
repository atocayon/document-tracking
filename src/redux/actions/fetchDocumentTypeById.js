import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function fetchDocumentTypeById(id) {
  return function (dispatch) {
    return axios
      .get(
        "http://" +
          localIpUrl("public", "ipv4") +
          ":4000/dts/fetchDocumentType/" +
          id
      )
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
