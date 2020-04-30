import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchUserById(id){
    return function (dispatch) {
        return axios.get("http://localhost:4000/dts/user/"+parseInt(id)).then(_user => {
            dispatch({
                type: actionTypes.FETCH_USER_BY_ID,
                data: _user.data
            });
        }).catch(err => {
            alert("Server Error");
        });
    }
}