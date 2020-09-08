import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchSectionDocuments(token, folder) {
  return async function (dispatch) {
    return axios
      .get(
        "http://" +
          endPoint.ADDRESS +
          "/dts/document/section/" +
          folder +
          "/" +
          token
      )
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_SECTION_DOCUMENTS,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
