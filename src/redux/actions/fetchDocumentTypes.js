import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchDocumentTypes() {
  return async function (dispatch) {
    return axios
      .get("http://" + process.env.REACT_APP_SERVER + "/dts/document/types")
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_TYPES,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
