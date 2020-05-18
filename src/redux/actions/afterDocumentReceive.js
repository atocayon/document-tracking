import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function afterDocumentReceive(
  documentId,
  user_id,
  remarks,
  destinationType,
  destination,
  status
) {
  return function (dispatch) {
    return axios
      .post("http://" + localIpUrl() + ":4000/dts/afterDocumentReceive", {
        documentId,
        user_id,
        remarks,
        destinationType,
        destination,
        status,
      })
      .then((res) => {
        if (res.status === 200) {
          if (status === "2") {
            dispatch({ type: actionTypes.CLEAR_RECEIVE_DOCUMENT });
            dispatch({
              type: actionTypes.AFTER_DOCUMENT_RECEIVED,
              data: "forward",
            });
          }

          if (status === "3") {
            dispatch({ type: actionTypes.CLEAR_RECEIVE_DOCUMENT });
            dispatch({
              type: actionTypes.AFTER_DOCUMENT_RECEIVED,
              data: "pending",
            });
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}
