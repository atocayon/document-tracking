import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function deleteDivision(div_id) {
  return async function (dispatch) {
    return axios
      .post("http://" + endPoint.ADDRESS + "/dts/division/delete", { div_id })
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_DIVISION, data: div_id });
      })
      .catch((err) => {
        throw err;
      });
  };
}
