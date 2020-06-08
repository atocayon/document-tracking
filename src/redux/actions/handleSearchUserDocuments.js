import actionTypes from "./actionTypes";
import axios from "axios";
export function handleSearchUserDocuments(value) {
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/searchUserDocument/" + value)
      .then((res) => {
        dispatch({
          type: actionTypes.HANDLE_SEARCH_USER_DOCUMENT,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
