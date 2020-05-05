import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchDocumentTypes(){
    return function(dispatch){
        return axios.get("http://localhost:4000/dts/documentType").then(document => {
            dispatch({type: actionTypes.FETCH_DOCUMENT_TYPES, data: document.data});
        }).catch(err => {
            alert(err);
        });
    }
}