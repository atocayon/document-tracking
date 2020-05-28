import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
import axios from "axios";

export function handleScan(data, user_id, secshort) {
  return function (dispatch) {
    dispatch({ type: actionTypes.HANDLE_SCAN, data });
    return axios
      .post("http://10.10.10.16:4000/dts/receiveDocument", {
        documentTracking: data,
        user_id: user_id,
        user_section: secshort,
      })
      .then((data) => {
        Reactotron.log(data);
        if (data.data.result === "success") {
          dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: "success" });
          axios
            .get("http://10.10.10.16:4000/dts/track/" + data)
            .then((res) => {
              dispatch({
                type: actionTypes.TRACK_DOCUMENT,
                data: res.data,
              });
            })
            .catch((err) => {
              throw err;
            });
        }

        if (data.data.result === "failed") {
          dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: "failed" });
        }
      })
      .catch((err) => {
        throw err;
        // dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: "failed" });
      });
  };
}

export function trackOnly(data) {
  return async function (dispatch) {
    await dispatch({ type: actionTypes.HANDLE_SCAN, data });
    return axios
      .get("http://10.10.10.16:4000/dts/track/" + data)
      .then((res) => {
        dispatch({
          type: actionTypes.TRACK_DOCUMENT,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
