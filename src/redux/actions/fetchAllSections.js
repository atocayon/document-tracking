import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchAllSections() {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/dts/sections")
      .then(_sections => {
        const section = [];
        for (let i = 0; i < _sections.data.length; i++) {
          section.push({
            id: _sections.data[i].secid,
            type: _sections.data[i].section
          });
        }

        dispatch({
          type: actionTypes.FETCH_ALL_SECTIONS,
          data: section
        });
      })
      .catch(err => {
        alert(err);
      });
  };
}
