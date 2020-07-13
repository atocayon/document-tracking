import actionTypes from "./actionTypes";

export function deleteUser(id, secid, socket) {
  return async function (dispatch) {

    await socket.on("deleteUser", id, secid, (res) => {
      if (res){
        if (res !== "server error"){
          dispatch({ type: actionTypes.DELETE_USER, res: true });
          dispatch({ type: actionTypes.POP_USER, data: id });
        }else{
          dispatch({ type: actionTypes.DELETE_USER, res: false });
        }
      }
    });
  };
}
