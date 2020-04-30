import actionTypes from "./actionTypes";
import axios from "axios";
export function deleteUser(id){
    return function(dispatch){
        axios.post("http://localhost:4000/dts/deleteUser", {id: id}).then(_res => {
            dispatch({type: actionTypes.DELETE_USER, res: true});
        }).catch(err => {
            dispatch({type: actionTypes.DELETE_USER, res: false});
        });
    }
}