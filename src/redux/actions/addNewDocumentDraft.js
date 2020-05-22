import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function addNewDocumentDraft(
  documentID,
  user_id,
  subject,
  documentType,
  note,
  action_req
) {
  return function (dispatch) {
    return axios
      .post("http://10.10.10.16:4000/dts/draft", {
        documentID: documentID,
        creator: user_id,
        subject: subject,
        doc_type: documentType,
        note: note,
        action_req: action_req,
      })
      .then((res) => {
        dispatch({ type: actionTypes.ADD_DOCUMENT_DRAFT, data: "success" });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ADD_DOCUMENT_DRAFT, data: "failed" });
      });
  };
}


export function clearDraftsMessage(){
    return function(dispatch){
        return dispatch({type: actionTypes.CLEAR_SAVE_DRAFT_MESSAGE});
    }
}
