import actionTypes from "./actionTypes";
import axios from "axios";
export function updateDocumentType(data) {
  const { id, type } = data;
  return async function (dispatch) {
    return axios
      .post(
        "http://" + process.env.REACT_APP_SERVER + "/dts/document/type/update",
        { doc_type_id: id, doc_type: type }
      )
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_DOCUMENT_TYPE, data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
