import actionTypes from "./actionTypes";
import axios from "axios";
export function deleteDocumentType(doc_type_id) {
  return async function (dispatch) {
    return axios
      .post(
        "http://" + process.env.REACT_APP_SERVER + "/dts/document/type/delete",
        {
          doc_type_id,
        }
      )
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_DOCUMENT_TYPE, data: doc_type_id });
      })
      .catch((err) => {
        throw err;
      });
  };
}
