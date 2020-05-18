import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function fetchDocumentById(id) {
  return function (dispatch) {
    return axios
      .get(
        "http://" +
          localIpUrl("public", "ipv4") +
          ":4000/dts/fetchDocument/" +
          id
      )
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
