import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";

export function updateUserProfile(data) {
    Reactotron.log(data);
  return function(dispatch) {
    return axios
      .post("http://localhost:4000/dts/updateUser/" + data.user_id.toString(), {
        employeeId: data.employeeId,
        name: data.name,
        username: data.username,
        contact: data.contact,
        email: data.email,
        division: data.division,
        section: data.section,
        position: data.position,
        address: data.address,
        bdate: data.bdate,
        gender: data.gender
      })
      .then(res => {

        if (res.status === 200) {
          dispatch({
            type: actionTypes.UPDATE_USER_PROFILE,
            res
          });
        }

        if (res.status === 500){
            Reactotron.log(res);
            console.log(res);
        }
      })
      .catch(err => {
        dispatch({
            type: actionTypes.UPDATE_USER_PROFILE,
            res: err
        });
      });
  };
}
