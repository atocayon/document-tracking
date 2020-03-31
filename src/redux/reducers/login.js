import actionTypes from "../actions/actionTypes";

export default function login(state = [], action){
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return [...state, {...action.login}];
        default:
            return state;
    }
}

