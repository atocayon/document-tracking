import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchDocumentTypes() {
  return async function (dispatch) {
    return axios
      .get("http://" + endPoint.ADDRESS + "/dts/document/types")
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
