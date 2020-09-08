import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchSectionUsers(token) {
  return async function (dispatch) {
    const user_section = axios.get(
      "http://" + endPoint.ADDRESS + "/dts/user/" + token
    );

    return axios
      .get(
        "http://" +
          endPoint.ADDRESS +
          "/dts/users/section/" +
          user_section.data.secid
      )
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_SECTION_USERS,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
