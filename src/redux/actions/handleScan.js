import actionTypes from "./actionTypes";
import axios from "axios";
export function receiveDoc(data, user_id, secshort, socket) {
  return async function (dispatch) {
    let str = data.split("-", 1);
    dispatch({ type: actionTypes.HANDLE_SCAN, data });
    await socket.emit(
      "receive_document",
      data,
      user_id,
      secshort,
      async (message) => {
        if (message === "server error") {
          return dispatch({
            type: actionTypes.RECEIVE_DOCUMENT,
            data: "failed",
          });
        }

        if (message === "success") {
          let arr = [];
          let track = await axios.get(
            "http://" +
              process.env.REACT_APP_SERVER +
              "/dts/document/tracking/" +
              str.toString()
          );

          for (let i = 0; i < track.data.length; i++) {
            // Reactotron.log(res.data[i].document_id);
            let fetch = await get_branches(track.data[i].document_id);
            let sub = await getSubProcess(track.data[i].document_id);
            arr.push({ root: track.data[i], subProcess: sub, branch: fetch });
          }

          dispatch({
            type: actionTypes.TRACK_DOCUMENT,
            data: arr,
          });

          dispatch({
            type: actionTypes.RECEIVE_DOCUMENT,
            data: "success",
          });
        }

        if (message === "failed") {
          return dispatch({
            type: actionTypes.RECEIVE_DOCUMENT,
            data: "pending",
          });
        }
      }
    );
  };
}

export function trackDoc(data) {
  return async function (dispatch) {
    let str = data.split("-", 1);
    let arr = [];
    let track = await axios.get(
      "http://" +
        process.env.REACT_APP_SERVER +
        "/dts/document/tracking/" +
        str.toString()
    );

    for (let i = 0; i < track.data.length; i++) {
      // Reactotron.log(res.data[i].document_id);
      let fetch = await get_branches(track.data[i].document_id);
      let sub = await getSubProcess(track.data[i].document_id);
      arr.push({ root: track.data[i], subProcess: sub, branch: fetch });
    }

    dispatch({
      type: actionTypes.TRACK_DOCUMENT,
      data: arr,
    });
  };
}

async function getSubProcess(tracking) {
  // Reactotron.log(tracking);
  let arr = [];
  let res = await axios.get(
    "http://" +
      process.env.REACT_APP_SERVER +
      "/dts/document/process/" +
      tracking
  );
  // Reactotron.log(res);
  if (res.data.length > 0) {
    for (let i = 0; i < res.data.length; i++) {
      arr.push({
        root: res.data[i],
      });
    }
    return arr;
  } else {
    return arr;
  }
}

async function get_branches(tracking) {
  let arr = [];
  let res = await axios.get(
    "http://" + process.env.REACT_APP_SERVER + "/dts/document/sub/" + tracking
  );

  if (res.data.length > 0) {
    for (let i = 0; i < res.data.length; i++) {
      let fetch = await get_branches(res.data[i].document_id);
      let sub = await getSubProcess(res.data[i].document_id);
      arr.push({
        root: res.data[i],
        subProcess: sub,
        branch: fetch,
      });
    }
    return arr;
  } else {
    return arr;
  }
}
