import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchDocumentById(doc_id) {
  return async function (dispatch) {
    return axios
      .get("http://" + process.env.REACT_APP_SERVER + "/dts/document/" + doc_id)
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
