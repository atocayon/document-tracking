import actionTypes from "./actionTypes";

export function clearDestination(){
    return function(dispatch){
        return dispatch({type: actionTypes.CLEAR_DESTINATION});
    }
}