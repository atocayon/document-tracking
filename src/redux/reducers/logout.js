import actionTypes from "../actions/actionTypes";

const defaultState = null;

export default function logout(state=defaultState, action) {
    switch (action.type) {
        case actionTypes.LOG_OUT:
            return state = action.logout;
        default:
            return state;
    }
}