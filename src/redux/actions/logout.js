import actionTypes from "./actionTypes";
import axios from "axios";

export function logout(token){
    return function(dispatch){
        return  axios
            .post("http://localhost:4000/dts/logout/" + token)
            .then(res => {
                localStorage.clear();
                dispatch({type: actionTypes.LOG_OUT, logout: true});
            })
            .catch(err => {
                dispatch({type: actionTypes.LOG_OUT, logout: false});
            });
    }
}