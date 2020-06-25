import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import server_ip from "../../component/endPoint";

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
      .post(server_ip.SERVER_IP_ADDRESS+"addNewSection", {
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
