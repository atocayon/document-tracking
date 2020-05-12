import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
export function handleScan(data) {
  Reactotron.log(data);
  return function(dispatch) {
    return dispatch({ type: actionTypes.HANDLE_SCAN, data });
  };
}
