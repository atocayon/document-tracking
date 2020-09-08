import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchAllSections() {
  return async function (dispatch) {
    return axios
      .get("http://" + endPoint.ADDRESS + "/dts/sections")
      .then(async (res) => {
        const section = [];
        const internalDestination = [];
        for (let i = 0; i < res.data.length; i++) {
          section.push({
            id: res.data[i].secid,
            type: res.data[i].section,
          });

          internalDestination.push({
            id: res.data[i].secshort,
            type: res.data[i].section,
          });
        }

        await dispatch({
          type: actionTypes.FETCH_ALL_SECTIONS,
          data: section,
        });

        await dispatch({
          type: actionTypes.FETCH_INTERNAL_DESTINATION,
          data: internalDestination,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
