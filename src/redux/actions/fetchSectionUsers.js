import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function fetchSectionUsers(token) {
  return async function (dispatch) {
    return axios
      .get("http://" + process.env.REACT_APP_SERVER + "/dts/user/" + token)
      .then((res) => {
        Reactotron.log(res.data.secid);
        dispatch({
          type: actionTypes.FETCH_CURRENT_USER,
          data: res.data,
        });
        axios
          .get(
            "http://" +
              process.env.REACT_APP_SERVER +
              "/dts/users/section/" +
              res.data.secid
          )
          .then((res) => {
            Reactotron.log(res.data);
            dispatch({
              type: actionTypes.FETCH_SECTION_USERS,
              data: res.data,
            });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });

    return;
  };
}
