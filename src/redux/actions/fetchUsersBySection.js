import actionTypes from "./actionTypes";
import axios from "axios";

export function loadUsers(section){
    return function (dispatch){
        return axios.get('http://localhost:4000/dts/sectionUser/'+section).then(users => {
            dispatch({
                type: actionTypes.LOAD_USER_BY_SECTION,
                users
            });
        });
    };
}