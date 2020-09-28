import actionTypes from "./actionTypes";
import axios from "axios";
export function deleteUser(user_id) {
  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/dts/user/delete", {
        user_id,
      })
      .then(async (res) => {
        await dispatch({ type: actionTypes.DELETE_USER, res: "success" });
        await dispatch({ type: actionTypes.POP_USER, data: user_id });
      })
      .catch((err) => {
        throw err;
      });
  };
}
