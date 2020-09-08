import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function expandDocLogs(data) {
  const { doc_id, status } = data;
  return async function (dispatch) {
    return axios
      .get(
        "http://" +
          endPoint.ADDRESS +
          "/dts/document/expand/" +
          doc_id +
          "/" +
          status
      )
      .then((res) => {
        dispatch({ type: actionTypes.EXPAND_DOC_LOGS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function clearExpandLogs() {
  return async function (dispatch) {
    dispatch({ type: actionTypes.CLEAR_EXPAND_DOC_LOGS });
  };
}
