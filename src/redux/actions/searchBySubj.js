import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function searchBySubj(subj) {
    Reactotron.log(subj);
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/searchBySubject/" + subj)
      .then((res) => {
          Reactotron.log(res);
        dispatch({ type: actionTypes.SEARCH_BY_SUBJ, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
