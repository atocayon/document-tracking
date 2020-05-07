import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
export function clearDestination(){
    return function(dispatch){
        return dispatch({type: actionTypes.CLEAR_DESTINATION});
    }
}

export function clearExternalDestinationInput(){
    return function(dispatch){
        return dispatch({type: actionTypes.CLEAR_EXTERNAL_DESTINATION_INPUT});
    }
}

export function clearInternalDestinationInput(){
    return function(dispatch){
        return dispatch({type: actionTypes.CLEAR_INTERNAL_DESTINATION_INPUT});
    }
}

export function removeDestination(index) {

    return function(dispatch){
        return dispatch({type: actionTypes.REMOVE_DESTINATION, index});
    }
}