import actionTypes from "./actionTypes";
import axios from "axios";

export function addNewDocumentDraft(documentID, user_id, subject, documentType, note, action_req){
    return function(dispatch){
        return axios
            .post("http://localhost:4000/dts/draft", {
                documentID: documentID,
                creator: user_id,
                subject: subject,
                doc_type: documentType,
                note: note,
                action_req: action_req
            }).then(res => {
                dispatch({type: actionTypes.ADD_DOCUMENT_DRAFT, data: "success"});
            }).catch(err => {
                dispatch({type: actionTypes.ADD_DOCUMENT_DRAFT, data: "failed"});
            });
    }
}