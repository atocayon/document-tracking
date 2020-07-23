import actionTypes from "./actionTypes";

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
        let fetch = await get_branches(_data[i].document_id, socket);
        let sub = await getSubProcess(_data[i].document_id, socket);
        arr.push({ root: _data[i], subProcess: sub, branch: fetch });
      }

      dispatch({
        type: actionTypes.TRACK_DOCUMENT,
        data: arr,
      });
    });
  };
}

async function getSubProcess(tracking, socket) {
  let arr = [];
  await socket.emit("fetchSubProcess", tracking, (res) => {
    if (res) {
      if (res !== "server error") {
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            arr.push({
              root: res[i],
            });
          }
          return arr;
        } else {
          return arr;
        }
      }
    }
  });
}

async function get_branches(tracking, socket) {
  let arr = [];
  await socket.emit("fetchSubDocument", tracking, async (res) => {
    if (res) {
      if (res !== "server error") {
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            let fetch = await get_branches(res[i].document_id, socket);
            let sub = await getSubProcess(res[i].document_id, socket);
            arr.push({
              root: res[i],
              subProcess: sub,
              branch: fetch,
            });
          }
          return arr;
        } else {
          return arr;
        }
      }
    }
  });
}
