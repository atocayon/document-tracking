import actionTypes from "./actionTypes";
import axios from "axios";
export function afterDocumentReceive(
  documentId,
  user_id,
  remarks,
  destinationType,
  destination,
  status
) {
  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/dts/document/action", {
        documentId,
        user_id,
        remarks,
        destinationType,
        destination,
        status,
      })
      .then((res) => {
        dispatch({
          type: actionTypes.AFTER_DOCUMENT_RECEIVED,
          data: status === "2" ? "forwarded" : "completed",
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
