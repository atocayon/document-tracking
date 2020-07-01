import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";
export function addNewDocument(
  documentID,
  user_id,
  subject,
  documentType,
  note,
  action_req,
  destination,
  category,
  socket
) {
  return async function (dispatch) {
    await socket.emit(
      "addDocument",
      documentID,
      user_id,
      subject,
      documentType,
      note,
      action_req,
      destination,
      category,
      async (message) => {
        if (message !== "success") {
          return dispatch({ type: actionTypes.ADD_DOCUMENT, data: "failed" });
        } else {
          await axios.post(
            server_ip.SERVER_IP_ADDRESS + "sendEmail",
            { type: "send",sender: user_id, subject, destination }
          );
          return dispatch({ type: actionTypes.ADD_DOCUMENT, data: "success" });
        }
      }
    );
  };
}

export function clearAddDocumentMessage() {
  return function (dispatch) {
    return dispatch({ type: actionTypes.CLEAR_ADD_DOCUMENT_MESSAGE });
  };
}
