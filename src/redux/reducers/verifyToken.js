import actionTypes from "../actions/actionTypes";

export default function verifyToken(state=[], action) {
    switch (action.type) {
        case actionTypes.VERIFY_USER:
            return [...state, {...action.verify}];
        default:
            return state;
    }
}