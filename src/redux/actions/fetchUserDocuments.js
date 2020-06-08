import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";

export function fetchUserDocuments(token) {
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/fetchUserDocuments/" + token)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_USER_DOCUMENTS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
