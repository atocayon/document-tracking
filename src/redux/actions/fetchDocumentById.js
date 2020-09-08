import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchDocumentById(doc_id) {
  return async function (dispatch) {
    return axios
      .get("http://" + endPoint.ADDRESS + "/dts/document/" + doc_id)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_BY_ID,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
