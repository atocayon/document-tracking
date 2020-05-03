import actionTypes from "./actionTypes";
import axios from "axios";

export function deleteDivision(id){
    return function(dispatch){
        return axios.post("http://localhost:4000/dts/deleteDivision/"+id).then(res => {
            if (res.status === 200){
                dispatch({
                    type: actionTypes.DELETE_DIVISION,
                    data: id
                });
            }
        }).catch(err => {
            alert(err);
        });
    }
}