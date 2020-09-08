import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function deleteSection(sec_id) {
  return async function (dispatch) {
    return axios
      .post("http://" + endPoint.ADDRESS + "/dts/section/delete", { sec_id })
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_SECTION, data: sec_id });
      })
      .catch((err) => {
        throw err;
      });
  };
}
