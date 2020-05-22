import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
import axios from "axios";
import UIFx from "uifx";
import sound from "../../component/sounds/done-for-you.mp3";
export function handleScan(data, documentTrackingNumber, user_id, secshort) {
  Reactotron.log(data);
  const systemSound = new UIFx({ asset: sound });

  return async function (dispatch) {
    await dispatch({ type: actionTypes.HANDLE_SCAN, data });
    return axios
      .post("http://10.10.10.16:4000/dts/receiveDocument", {
        documentTracking: data,
        user_id: user_id,
        user_section: secshort,
      })
      .then((receive) => {
        Reactotron.log("Success");
        dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: "success" });
        axios
          .get("http://10.10.10.16:4000/dts/track/" + data)
          .then((res) => {
            systemSound.setVolume(1).play();
            dispatch({
              type: actionTypes.TRACK_DOCUMENT,
              data: res.data,
            });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: "failed" });
      });
  };
}

export function trackOnly(data) {
  const systemSound = new UIFx({ asset: sound });
  return async function (dispatch) {
    await dispatch({ type: actionTypes.HANDLE_SCAN, data });
    return axios
      .get("http://10.10.10.16:4000/dts/track/" + data)
      .then((res) => {
        systemSound.setVolume(1.0).play();
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
