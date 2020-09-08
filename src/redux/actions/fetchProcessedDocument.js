import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchProcessedDocument(token) {
  return async function (dispatch) {
    return axios
      .get("http://" + endPoint.ADDRESS + "/dts/document/logs/" + token)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_PROCESSED_DOCUMENT,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
