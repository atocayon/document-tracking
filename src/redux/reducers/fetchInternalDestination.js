import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function fetchInternalDestination(state= defaultState, action){
    switch (action.type) {
        case actionTypes.FETCH_INTERNAL_DESTINATION:
            return [...action.data];
        default:
            return state;
    }
}