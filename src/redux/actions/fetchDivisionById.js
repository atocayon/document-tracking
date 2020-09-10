import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchDivisionById(div_id) {
  return async function (dispatch) {
    return axios
      .get("http://" + process.env.REACT_APP_SERVER + "/dts/division/" + div_id)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_DIVISION_BY_ID,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
