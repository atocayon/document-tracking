import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
import axios from "axios";

export function handleScan(data, user_id, secshort, socket) {

  return async function (dispatch) {
    dispatch({ type: actionTypes.HANDLE_SCAN, data });
    await socket.emit("receiveDocument", data, user_id, secshort, (message) => {
      Reactotron.log("Na receive");
      Reactotron.log(message);
      if (message === "server error") {
        dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: "failed" });
      }

      if (message === "success") {
        dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: "success" });
        socket.emit("tracking", data);
        socket.on("track", (_data) => {
          dispatch({
            type: actionTypes.TRACK_DOCUMENT,
            data: _data,
          });
        });
      }
    });
  };
}

export function trackOnly(data, socket) {
  return async function (dispatch) {
    await dispatch({ type: actionTypes.HANDLE_SCAN, data });
    await socket.emit("tracking", data);
    await socket.on("track", (_data) => {
      Reactotron.log(_data);
      dispatch({
        type: actionTypes.TRACK_DOCUMENT,
        data: _data,
      });
    });
  };
}
