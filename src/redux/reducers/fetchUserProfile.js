import actionTypes from "../actions/actionTypes";

export default function fetchUserProfile(state= [], action) {
    switch (action.type) {
        case actionTypes.USER_PROFILE:
            return [...state, {...action.data}];
        default:
            return state;
    }
}