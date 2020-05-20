import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function fetchAllSections(state = defaultState, action){
    switch (action.type) {
        case actionTypes.FETCH_ALL_SECTIONS:
            return [...action.data];
        default:
            return state;
    }
}