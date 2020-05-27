import actionTypes from "./actionTypes";
import axios from "axios";

export function userRegistration(
  section,
  user_role,
  employeeId,
  name,
  username,
  password,
  confirmPassword,
  email,
  contact,
  position,
  socket
) {
  const _data = {
    secid: section,
    role_id: user_role,
    employeeId,
    name,
    username,
    email,
    contact,
    position,
    accnt_status: "1",
  };

  return async function (dispatch) {
      await socket.emit("addUser",
          user_role,
          employeeId,
          name,
          username,
          password,
          contact,
          email,
          section,
          position
  );
      // dispatch({ type: actionTypes.ADD_USER, _data });
      // dispatch({
      //     type: actionTypes.USER_REGISTRATION,
      //     message: "success",
      // });

    // return axios
    //   .post("http://10.10.10.16:4000/dts/addUser", {
    //     section,
    //     role: user_role,
    //     employeeId,
    //     name,
    //     username,
    //     password,
    //     confirmPassword,
    //     email,
    //     contact,
    //     position,
    //   })
    //   .then((_res) => {
    //     if (_res.status === 200) {
    //       if (_res.data.success === "success") {
    //
    //       }
    //       if (_res.data.success === "failed") {
    //         dispatch({
    //           type: actionTypes.USER_REGISTRATION,
    //           message: "failed",
    //         });
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     alert("Server Error");
    //   });
  };
}
