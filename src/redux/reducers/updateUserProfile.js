import actionTypes from "../actions/actionTypes";
const defaultState = null;
export default function updateUserProfile(state = defaultState, action){
    switch (action.type) {
        case actionTypes.UPDATE_USER_PROFILE:
            return state = action.res;
        default:
            return state;
    }
}