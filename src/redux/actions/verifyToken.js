import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function verifyToken(token) {
  return async function (dispatch) {
    return axios
      .post("http://" + endPoint.ADDRESS + "/", { token })
      .then((res) => {
        dispatch({ type: actionTypes.VERIFY_TOKEN, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
