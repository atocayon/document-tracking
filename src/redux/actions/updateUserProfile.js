import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function updateUserProfile(data) {
  // const _data = {
  //   user_id: parseInt(data.user_id),
  //   employeeId: data.employeeId,
  //   name: data.name,
  //   username: data.username,
  //   contact: data.contact,
  //   email: data.email,
  //   secid: data.secid,
  //   position: data.position,
  //   role: data.dts_role,
  // };
  Reactotron.log(data);
  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/dts/user/update", {
        data,
      })
      .then(async (res) => {
        await dispatch({
          type: actionTypes.UPDATE_USER_PROFILE,
          res: "success",
        });
        // await dispatch({
        //   type: actionTypes.UPDATE_USERS_LIST,
        //   _data,
        // });
      })
      .catch((err) => {
        throw err;
      });
  };
}
