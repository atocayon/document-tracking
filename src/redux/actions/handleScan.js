import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
import axios from "axios";
import server_ip from "../server_ip";

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
        socket.on("track", async (_data) => {
          let arr = [];
          for (let i = 0; i < _data.length; i++) {
            let data_branches = await get_branches(
                _data[i].trans_id,
                _data[i].document_id
            );

            arr.push({ doc: _data[i], sub: data_branches });
          }

          dispatch({
            type: actionTypes.TRACK_DOCUMENT,
            data: arr,
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

    await socket.on("track", async (_data) => {
      let arr = [];
      for (let i = 0; i < _data.length; i++) {
        let data_branches = await get_branches(
          _data[i].trans_id,
          _data[i].document_id
        );

        arr.push({ doc: _data[i], sub: data_branches });
      }

      dispatch({
        type: actionTypes.TRACK_DOCUMENT,
        data: arr,
      });
    });
  };
}

async function get_branches(trans_id, tracking) {

  let arr = [];
  let data_branches = await axios.post(
      server_ip.SERVER_IP_ADDRESS+"fetchSubDocument",
    {
      trans_id,
      tracking,
    }
  );

  if (data_branches.data.length > 0) {
    for (let i = 0; i < data_branches.data.length; i++) {
      let branch = await get_branches(data_branches.data[i].trans_id,
          data_branches.data[i].document_id);
      arr.push({
        main: data_branches.data[i],
        sub: branch
      });
    }
    return arr;
  } else {
    return arr;
  }
}
