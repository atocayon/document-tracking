import actionTypes from "./actionTypes";
import axios from "axios";
export function deleteUser(id){
    return function(dispatch){
        axios.post("http://localhost:4000/dts/deleteUser", {id: id}).then(_res => {
            dispatch({type: actionTypes.DELETE_USER, res: true});
            dispatch({type: actionTypes.POP_USER, data: id});
        }).catch(err => {
            dispatch({type: actionTypes.DELETE_USER, res: false});
        });
    }
}