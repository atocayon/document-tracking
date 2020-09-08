import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function addNewSection(data) {
  const _data = {
    divid: data.division,
    section: data.section,
    secshort: data.secshort,
    active: 1,
  };
  const { division, section, secshort } = data;
  return async function (dispatch) {
    return axios
      .post("http://" + endPoint.ADDRESS + "/dts/section/new", {
        division,
        section,
        secshort,
      })
      .then((res) => {
        dispatch({ type: actionTypes.ADD_SECTION, _data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
