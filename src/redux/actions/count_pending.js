import actionTypes from "./actionTypes";

const count_pending = (user_id, socket) => {
  return (dispatch) => {
    socket.emit("total_pending_doc", user_id);
    socket.on("total_pendings", (data) => {
      //   setPending(data);

      dispatch({ type: actionTypes.COUNT_PENDING, data });
    });
  };
};

export { count_pending };
