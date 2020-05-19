import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function deleteDivision(id) {
  return function (dispatch) {
    return axios
      .post("http://10.10.10.16:4000/dts/deleteDivision/" + id)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.DELETE_DIVISION,
            data: id,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
}
