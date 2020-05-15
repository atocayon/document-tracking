import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function trackDocument(state = defaultState, action){
    switch (action.type) {
        case actionTypes.TRACK_DOCUMENT:
            return [...state, ...action.data];
        default:
            return state;
    }
}