import actionTypes from "../actions/actionTypes";
const defaultState = null;
export default function userRegistration(state= defaultState, action) {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return state = action.res;
        default:
            return state;
    }
}