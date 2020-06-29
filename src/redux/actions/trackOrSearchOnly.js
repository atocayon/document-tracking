import actionTypes from "./actionTypes";

export function trackOrSearchOnly(value){
    return function (dispatch) {
        return dispatch({type: actionTypes.TRACK_OR_SEARCH_ONLY, data: value});
    }
}