import actionTypes from "./actionTypes";
import axios from "axios";
export function addNewDocumentType(doc_type) {
  return async function (dispatch) {
    return axios
      .post(
        "http://" + process.env.REACT_APP_SERVER + "/dts/document/type/new",
        {
          doc_type,
        }
      )
      .then((res) => {
        dispatch({ type: actionTypes.ADD_DOCUMENT_TYPE, data: "success" });
      })
      .catch((err) => {
        throw err;
      });
  };
}
