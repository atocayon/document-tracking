import actionTypes from "./actionTypes";
import axios from "axios";
export function searchBySubj(subj) {
  return async function (dispatch) {
    return axios
      .get(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/dts/document/search/" +
          subj
      )
      .then((res) => {
        dispatch({ type: actionTypes.SEARCH_BY_SUBJ, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
