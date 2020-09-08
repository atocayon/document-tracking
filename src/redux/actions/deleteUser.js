import actionTypes from "./actionTypes";
import axios from "axios";
import endPoint from "../../component/endPoint";
export function deleteUser(user_id) {
  return async function (dispatch) {
    return axios
      .post("http://" + endPoint.ADDRESS + "/dts/user/delete", { user_id })
      .then(async (res) => {
        await dispatch({ type: actionTypes.DELETE_USER, res: true });
        await dispatch({ type: actionTypes.POP_USER, data: user_id });
      })
      .catch((err) => {
        throw err;
      });
  };
}
