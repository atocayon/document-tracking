import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function addNewDocument(
  documentID,
  user_id,
  subject,
  documentType,
  note,
  action_req,
  destination
) {
  return function (dispatch) {
    return axios
      .post("http://10.10.10.16:4000/dts/addNewDocument", {
        documentID: documentID,
        creator: user_id,
        subject: subject,
        doc_type: documentType,
        note: note,
        action_req: action_req,
        documentLogs: destination,
      })
      .then((res) => {
        dispatch({ type: actionTypes.ADD_DOCUMENT, data: "success" });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ADD_DOCUMENT, data: "failed" });
      });
  };
}
