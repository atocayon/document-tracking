import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const localIpUrl = require("local-ip-url");

export function addNewSection(data) {
  const _data = {
    divid: data.division,
    section: data.section,
    secshort: data.secshort,
    active: 1,
  };
  Reactotron.log(_data);
  return function (dispatch) {
    return axios
      .post("http://" + localIpUrl() + ":4000/dts/addNewSection", {
        division: data.division,
        section: data.section,
        secshort: data.secshort,
      })
      .then((res) => {
        dispatch({ type: actionTypes.ADD_SECTION, _data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
