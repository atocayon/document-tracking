import actionTypes from "./actionTypes";
import axios from "axios";
export function updateSection(data) {
  const {
    divid,
    secid,
    section,
    secshort,
    active,
    department,
    depshort,
  } = data;
  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/dts/section/update", {
        sec_id: secid,
        div_id: divid,
        section,
        secshort,
      })
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_SECTION, data: "success" });
      })
      .catch((err) => {
        throw err;
      });
  };
}
