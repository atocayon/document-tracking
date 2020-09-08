import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function addNewDocumentType(doc_type) {
  return async function (dispatch) {
    return axios
      .post("http://" + endPoint.ADDRESS + "/dts/document/type/new", {
        doc_type,
      })
      .then((res) => {
        dispatch({ type: actionTypes.ADD_DOCUMENT_TYPE, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
