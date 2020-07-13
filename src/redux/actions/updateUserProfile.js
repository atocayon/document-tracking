import actionTypes from "./actionTypes";

export function updateUserProfile(data, socket) {
  const _data = {
    user_id: parseInt(data.user_id),
    employeeId: data.employeeId,
    name: data.name,
    username: data.username,
    contact: data.contact,
    email: data.email,
    secid: data.secid,
    position: data.position,
    role: data.role_id.toString(),
  };
  return async function (dispatch) {
    await socket.emit("updateUser", data, async (res) => {
      if (res) {
        if (res !== "server error") {
          await dispatch({
            type: actionTypes.UPDATE_USER_PROFILE,
            res: "success",
          });
          await dispatch({
            type: actionTypes.UPDATE_USERS_LIST,
            _data,
          });
        } else {
          alert("Something went wrong!");
        }
      }
    });
  };
}
