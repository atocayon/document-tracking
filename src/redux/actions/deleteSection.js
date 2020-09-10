import actionTypes from "./actionTypes";
import axios from "axios";
export function deleteSection(sec_id) {
  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/dts/section/delete", {
        sec_id,
      })
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_SECTION, data: sec_id });
      })
      .catch((err) => {
        throw err;
      });
  };
}
