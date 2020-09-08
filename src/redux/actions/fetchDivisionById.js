import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchDivisionById(div_id) {
  return async function (dispatch) {
    return axios
      .get("http://" + endPoint.ADDRESS + "/dts/division/" + div_id)
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
