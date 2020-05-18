import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function deleteDocumentType(id) {
  return function (dispatch) {
    return axios
      .post(
        "http://" +
          localIpUrl("public", "ipv4") +
          ":4000/dts/deleteDocumentType/" +
          id
      )
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_DOCUMENT_TYPE, data: id });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
