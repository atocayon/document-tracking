import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
import axios from "axios";
import server_ip from "../../component/endPoint";

export function receiveDoc(data, user_id, secshort, socket) {
  return async function (dispatch) {
    let str = data.split("-", 1);
    dispatch({ type: actionTypes.HANDLE_SCAN, data });
    await socket.emit(
      "receiveDocument",
      data,
      user_id,
      secshort,
      async (message) => {
        if (message === "server error") {
          dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: "failed" });
        }

        if (message === "success") {
          dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: "success" });
          socket.emit("tracking", str.toString());

          socket.on("track", async (_data) => {
            let arr = [];

            for (let i = 0; i < _data.length; i++) {
              let fetch = await get_branches(_data[i].document_id);
              let sub = await getSubProcess(_data[i].document_id);
              arr.push({ root: _data[i], subProcess: sub, branch: fetch });
            }

            Reactotron.log(arr);
            dispatch({
              type: actionTypes.TRACK_DOCUMENT,
              data: arr,
            });
          });
        }

        if (message === "failed") {
          dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: "pending" });
        }
      }
    );
  };
}

export function trackDoc(data, socket) {
  return async function (dispatch) {
    let str = data.split("-", 1);
    await dispatch({ type: actionTypes.HANDLE_SCAN, data });
    await socket.emit("tracking", str.toString());

    await socket.on("track", async (_data) => {
      let arr = [];

      for (let i = 0; i < _data.length; i++) {
        let fetch = await get_branches(_data[i].document_id);
        let sub = await getSubProcess(_data[i].document_id);
        arr.push({ root: _data[i], subProcess: sub, branch: fetch });
      }

      Reactotron.log(arr);
      dispatch({
        type: actionTypes.TRACK_DOCUMENT,
        data: arr,
      });
    });
  };
}

async function getSubProcess(tracking) {
  let arr = [];
  let subProcess = await axios.post(
    server_ip.SERVER_IP_ADDRESS + "fetchSubProcess",
    { tracking }
  );
  if (subProcess.data.length > 0) {
    for (let i = 0; i < subProcess.data.length; i++) {
      arr.push({
        root: subProcess.data[i],
      });
    }
    return arr;
  } else {
    return arr;
  }
}

async function get_branches(tracking) {
  let arr = [];
  let data_branches = await axios.post(
    server_ip.SERVER_IP_ADDRESS + "fetchSubDocument",
    {
      tracking,
    }
  );

  if (data_branches.data.length > 0) {
    for (let i = 0; i < data_branches.data.length; i++) {
      let fetch = await get_branches(data_branches.data[i].document_id);
      let sub = await getSubProcess(data_branches.data[i].document_id);
      arr.push({
        root: data_branches.data[i],
        subProcess: sub,
        branch: fetch,
      });
    }
    return arr;
  } else {
    return arr;
  }
}
