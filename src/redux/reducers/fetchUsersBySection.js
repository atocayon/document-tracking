import actionTypes from "../actions/actionTypes";

export default function fetchUsersBySection(state = [], action) {
    switch (action.type) {
        case actionTypes.LOAD_USER_BY_SECTION:
            return [...state, {...action.users}];
        default:
            return state;
    }
}