import actionTypes from "./actionTypes";
import axios from "axios";
export function deleteDivision(div_id) {
  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/dts/division/delete", {
        div_id,
      })
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_DIVISION, data: "success" });
      })
      .catch((err) => {
        throw err;
      });
  };
}
