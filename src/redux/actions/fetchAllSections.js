import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";


export function fetchAllSections() {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"sections")
      .then((_sections) => {
        const section = [];
        const internalDestination = [];
        for (let i = 0; i < _sections.data.length; i++) {
          section.push({
            id: _sections.data[i].secid,
            type: _sections.data[i].section,
          });

          internalDestination.push({
            id: _sections.data[i].secshort,
            type: _sections.data[i].section,
          });
        }

        dispatch({
          type: actionTypes.FETCH_ALL_SECTIONS,
          data: section,
        });

        dispatch({
          type: actionTypes.FETCH_INTERNAL_DESTINATION,
          data: internalDestination,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
