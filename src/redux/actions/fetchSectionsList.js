import axios from "axios";
import actionTypes from "./actionTypes";

export function fetchSectionsList(){
    return function(dispatch) {
        return axios
            .get("http://localhost:4000/dts/sections")
            .then(_sections => {
                dispatch({
                    type: actionTypes.FETCH_SECTIONS_LIST,
                    data: _sections.data
                });
            }).catch(err => {
                alert(err);
            });
    };
}