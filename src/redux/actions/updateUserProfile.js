import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";

export function updateUserProfile(data) {
  return function(dispatch) {
    return axios
      .post("http://localhost:4000/dts/updateUser/" + parseInt(data.user_id), {
        employeeId: data.employeeId,
        name: data.name,
        username: data.username,
        contact: data.contact,
        email: data.email,
        section: data.secid,
        position: data.position,
        role: data.role
      })
      .then(_res => {
        if (_res.status === 200) {
          dispatch({
            type: actionTypes.UPDATE_USER_PROFILE,
            res: true
          });
        }
      })
      .catch(err => {
        dispatch({
          type: actionTypes.UPDATE_USER_PROFILE,
          res: false
        });
      });
  };
}
