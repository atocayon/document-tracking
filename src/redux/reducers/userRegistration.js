import actionTypes from "../actions/actionTypes";
const defaultState = "";

export default function userRegistration(state = defaultState, action){
    switch (action.type) {
        case actionTypes.USER_REGISTRATION:
            return state = action.message;
        default:
            return state;
    }
}