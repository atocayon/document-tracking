import actionTypes from "../actions/actionTypes";

export default function updateUserProfile(state = [], action){
    switch (action.type) {
        case actionTypes.UPDATE_USER_PROFILE:
            return [...state, {...action.res}];
        default:
            return state;
    }
}