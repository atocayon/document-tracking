import actionTypes from "../actions/actionTypes";

export default function addNewDocCategory(state = "", action){
    switch (action.type) {
        case actionTypes.ADD_NEW_DOCUMENT_CATEGORY:
            return state = action.data;
        default:
            return state;
    }
}