import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function fetchDivisionById(id) {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/dts/fetchDivisionById/" + id)
      .then(res => {
        dispatch({ type: actionTypes.FETCH_DIVISION_BY_ID, data: res.data });
      })
      .catch(err => {
        alert(err);
      });
  };
}
