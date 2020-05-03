import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchDivisions(){
    return function(dispatch){
        return axios.get("http://localhost:4000/dts/fetchDivisions").then(res => {
            dispatch({type: actionTypes.FETCH_DIVISIONS, data: res.data});
        }).catch(err => {
            alert(err);
        });
    }
}