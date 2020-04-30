import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function fetchAllUsers(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.FETCH_ALL_USER:
            return [...state, ...action.data];
        default:
            return state;
    }
}