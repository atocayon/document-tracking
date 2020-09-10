import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchDocumentTypeById(id) {
  return async function (dispatch) {
    return axios
      .get(
        "http://" + process.env.REACT_APP_SERVER + "/dts/document/type/" + id
      )
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_TYPE_BY_ID,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
