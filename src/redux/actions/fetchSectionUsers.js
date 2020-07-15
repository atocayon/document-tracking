import actionTypes from "./actionTypes";
export function fetchSectionUsers(token, socket) {
  return async function (dispatch) {
    await socket.emit("user", token, async (res) => {
      if (res) {
        if (res !== "server error") {
          await dispatch({ type: actionTypes.FETCH_CURRENT_USER, data: res });
          await socket.emit("sectionUser", res.secid, (res) => {
            if (res) {
              if (res !== "server error") {
                dispatch({
                  type: actionTypes.FETCH_SECTION_USERS,
                  data: res,
                });
              }
            }
          });
        }
      }
    });
  };
}
