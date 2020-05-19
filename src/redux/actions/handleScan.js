import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
import axios from "axios";
export function handleScan(data) {
  Reactotron.log(data);
  return async function (dispatch) {
    await dispatch({ type: actionTypes.HANDLE_SCAN, data });
    return axios
      .get("http://10.10.10.16:4000/dts/track/" + data)
      .then((res) => {
        dispatch({ type: actionTypes.TRACK_DOCUMENT, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
