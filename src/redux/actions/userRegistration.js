import actionTypes from "./actionTypes";
import axios from "axios";
import {withSnackbar} from "notistack";

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
  position
) {
  return function(dispatch) {
      return axios.post(
          "http://localhost:4000/dts/addUser", {
              section,
              role: user_role,
              employeeId,
              name,
              username,
              password,
              confirmPassword,
              email,
              contact,
              position
          }
      ).then(
          _res => {
              if (_res.status === 200){
                  if (_res.data.success){
                      dispatch({
                          type: actionTypes.ADD_USER,
                          res: true
                      });
                  }else{
                      dispatch({
                          type: actionTypes.ADD_USER,
                          res: false
                      });
                  }
              }
          }
      ).catch(err => {
          dispatch({
              type: actionTypes.ADD_USER,
              res: "error"
          });
      });
  };
}
